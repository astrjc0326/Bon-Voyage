import React from 'react';

const PhotoEntry = ({photo}) => {
  return (
    // <div style={{width: '400px', height: '430px', backgroundImage: `url(${photo})`, backgroundRepeat:'no-repeat', marginTop:'30px'}}></div>
    <div style={{height: 'auto'}}>
    <img src={photo}></img>
    </div>
  )


}

export default PhotoEntry;