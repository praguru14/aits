import React from 'react';
 import './Rank.css';
// const Rank = () =>{
//     return(
//             <div className="  white f4">
//             {'Current rank is'}
//             <br/>
//             {'#5'}
//             </div>
//     );

// } 
const Rank = ({ name, entries }) => {
    return (
      <div>
        <div className='white f3'>
          {`${name}, The number of times you have entered is...`}
        </div>
        <div className='white f1'>
          {entries}
        </div>
      </div>
    );
  }
export default Rank;