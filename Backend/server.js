const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
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


app.post('/signin',(req,res)=>{
    // bcrypt.compare("praguru41", "$2a$10$.9rMqh8sqxvelTe1jx28b.wt47IIsn0jVMlVn/WODryklUbU/hOC6", function(err, res) {
    //     // res == true
    //     console.log("1st",res);
        
    // });
    // bcrypt.compare("password", "$2a$10$.9rMqh8sqxvelTe1jx28b.wt47IIsn0jVMlVn/WODryklUbU/hOC6", function(err, res) {
    //     // res = false
    //     console.log("2st",res);
    // })
    ;
    if(req.body.email===database.users[0].email&&
        req.body.password===database.users[0].password){
            res.json(database.users[0]);
        }
        else{
            res.status(400).json('Error logging in')
        }
    })

app.post('/register',(req,res)=>{
    const {email,name,password} =req.body;
        bcrypt.hash(password, null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(hash);
    });
   database.users.push({
    
        id:"124",
        name:name,
        email:email,
        password:password,
        entries:0,
        joined : new Date()
    
    
   })

   res.json(database.users[database.users.length-1])
})



app.get('/profile/:id',(req,res)=>{
    const {id }= req.params;
    let found= false;
    database.users.forEach(users =>{
        if(users.id===id){
            found=true;
           return res.json(users);

        }
        
    })
    if(!found){
        res.json("no");
    }
})


app.put('/image',(req,res)=>{
    const {id }= req.body;
    let found= false;
    database.users.forEach(users =>{
        if(users.id===id){
            found=true;
            users.entries++;
        
           return res.json(users.entries);

        }
        
    })
    if(!found){
        res.json("no");
    }
})

// const {email,name,password} =req.body;
// bcrypt.hash(password, null, null, function(err, hash) {
//  // Store hash in your password DB.
//  console.log(hash);
// });

// // Load hash from your password DB.





app.listen(3000,()=>{
console.log("running");

})



