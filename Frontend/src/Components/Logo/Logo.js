import React from 'react';
import Tilt from 'react-tilt';
import gs3 from './gs3.png';
import './Logo.css';

const Logo = () =>{
    return(
            <div className='block'>
            <Tilt className="Tilt br4 shadow-2 img" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner pa3 ">
             <img className="bg" style = {{ padding:`5px`}} src= {gs3} alt="gs3"/>
              </div>
            </Tilt>

            </div>
    );

} 

export default Logo;