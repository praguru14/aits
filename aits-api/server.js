const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const knex= require('knex');



const db = knex({

    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'ucmeeyes',
      database : 'aits'
    }
  });

// db.select('*').from('users').then(data=>{
//     console.log(data);
//   });

const app = express();

app.use(bodyParser.json());
app.use(cors());
const database={
    users  : [
{
    id:"123",
    name:"Prafull",
    email:"praguru14@gmail.com",
    password: "praguru14",
    entries:0,
    joined : new Date()
},


   ],
   login:[{
       id:"67",
       hash:"",
       email:"praguru14@gmail.com"
   }]

}

app.get('/',(req,res)=>{
res.send(database.users);
})

//signin


app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
      .where('email', '=', req.body.email)
      .then(data => {
        const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
        if (isValid) {
          return db.select('*').from('users')
            .where('email', '=', req.body.email)
            .then(user => {
              res.json(user[0])
            })
            .catch(err => res.status(400).json('unable to get user'))
        } else {
          res.status(400).json('wrong credentials')
        }
      })
      .catch(err => res.status(400).json('wrong credentials'))
  })

app.post('/register',(req,res)=>{
    const {email,name,password} =req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
          hash: hash,
          email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
            .returning('*')
            .insert({
              email: loginEmail[0],
              name: name,
              joined: new Date()
            })
            .then(user => {
              res.json(user[0]);
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      .catch(err => res.status(400).json('unable to register'))
  })




app.put('/image', (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
  })

// const {email,name,password} =req.body;
// bcrypt.hash(password, null, null, function(err, hash) {
//  // Store hash in your password DB.
//  console.log(hash);
// });

// // Load hash from your password DB.





app.listen(3000,()=>{
console.log("Application running at port 3000");

})



