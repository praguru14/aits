import React from 'react';
import "./FaceRecognition.css";

const FaceRecognition = ({imageUrl,box}) =>{
  return (
    <div className='center'>
    <div className="absolute mt2">
        <img id = "InputImage" className="a" src={imageUrl} alt="" width="500px" heigh="auto"/>
        <div className="bounding" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    </div>
  );
}

export default  FaceRecognition;