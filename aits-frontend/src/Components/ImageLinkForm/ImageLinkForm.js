import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>{
    return(
            <div className="f4">
            <p>
            {"Let the magic begins...Music"}
            </p>
            <div className="center">
            <div className="form center pa4 br-pill shadow-5">
                <input className="f4 pa2 w-70 center " type="tex" onChange={onInputChange}/>
                <button className="f4 link grow w-30 ph3 pv2 dib white bg-light-purple br-pill" onClick={onButtonSubmit}>
                    
                    Click Here.
                </button>
                </div>
            </div>
            </div>

// 8dafea22976e41f38efe856350f8732b
    );

} 

export default ImageLinkForm;