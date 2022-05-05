import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
`

const AddFlight = ({ getData, from, desination }) => {
  const [depart, setFrom] = useState('');
  const [des, setDet] = useState('');
  const [price, setPrice] = useState('');
  const handleSubmitOnClick = () => {
    const data = {
      fly_from: from,
      fly_to: desination,
      price,
      url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNy5MlPWw65goD3Mqow7kGiF9iYfFPlQgc_Ie7sJTSNK84RJ9uAK4rAuaf6Lis1YYt5qzwAjy7dLfeuKFZgEgI0E7tsLFMyOklGP3cEOo'
    }
    axios.post('flightlist', data)
      .then(res => { console.log(res); getData()})
  }

  return (
    <Container>From
    <input value={from} onChange={(e) => setFrom(e.target.value)}></input>
    To
    <input value={desination} onChange={(e) => setDet(e.target.value)}></input>
    Price
    <input onChange={(e) => setPrice(e.target.value)}></input>
    <button onClick={() => handleSubmitOnClick()}>Submit</button>
  </Container>)
}

export default AddFlight;