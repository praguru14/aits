import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Clarifai from 'clarifai';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';

import './App.css';
// import { render } from '@testing-library/react';



const app=new Clarifai.App({
  apiKey:'8dafea22976e41f38efe856350f8732b',
});

class App extends Component{
  constructor(){
    super();
    this.state={
      input : '',
      imageUrl:'',
      box:{},
      route:'SignIn',
      isSignedIn:false,
      user:{
        
        id:"",
        name:"",
        email:"",
        entries:0,
        joined : ""
      }
    }
  }
// componentDidMount(){
//   fetch("http://localhost:3000/").then(response=>response.json()).then(console.log)
// }

loadUser = (data) => {
  this.setState({user: {
    id: data.id,
    name: data.name,
    email: data.email,
    entries: data.entries,
    joined: data.joined
  }})
}
CalculateFaceLocation=(data)=>{
  const face= data.outputs[0].data.regions[0].region_info.bounding_box;
  console.log(data.outputs[0].data.regions[0].region_info.bounding_box);
  const image = document.getElementById('InputImage');
  const width = Number(image.width);
  const height = Number(image.height);
  return{
    leftCol: face.left_col * width,
    topRow: face.top_row * height,
    rightCol: width - (face.right_col * width),
    bottomRow: height - (face.bottom_row * height) +60
  }
}

DisplayFaceBox=(box)=>{
  console.log(box);
this.setState({box:box})
}

  onInputChange =(event) =>{
    this.setState({input:event.target.value});
  }

  onButtonSubmit =()=>{
    this.setState({imageUrl:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(response =>
    
      // do something with response  );
      {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.DisplayFaceBox(this.CalculateFaceLocation(response))
      })
   .catch(err=>console.log(err));


  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
render(){
  const { isSignedIn, imageUrl, route, box } = this.state;
  return (
    <div className="App">

          <Particles className="Particles"
                params={{
                  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
}
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: {
        enable: false,
        mode: "repulse"
      },
      onclick: {
        enable: true,
        mode: "push"
      }
  }}}} />
    <Navigation isSignedIn ={isSignedIn}
    onRouteChange = {this.onRouteChange}/> 
    {route==='home' 
    ? 
    <div>
    <Logo/>
     <Rank name={this.state.user.name}
                entries={this.state.user.entries}/>
    <ImageLinkForm onInputChange= {this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
    <FaceRecognition box={box} imageUrl={imageUrl}/> 
     
    </div>
    
    :
    ( this.state.route==='SignIn'
?<SignIn loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
: <Register loadUser={this.loadUser} onRouteChange = {this.onRouteChange}/>
    )
    
     }
    </div>
  );
}
}

export default App;

// https://image.shutterstock.com/image-photo/beauty-woman-face-portrait-beautiful-260nw-488715607.jpg