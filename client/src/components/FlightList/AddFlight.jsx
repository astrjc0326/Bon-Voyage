import React, { useState } from 'react';

const AddFlight = () => {
  const [des, setDet] = useState('');
  const [price, setPrice] = useState('');

  return (
    <div>Add Desination
    <input onChange={(e) => setDet(e.target.value)}></input>
    <div>{des}</div>
    Price
    <input onChange={(e) => setPrice(e.target.value)}></input>
    <div>{price}</div>
  </div>)
}

export default AddFlight