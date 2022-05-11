import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-around;
`;

function AddFlight({
  getData, from, desination, setFlights, fromCity, toCity, setAddFlightOnClick, setTo, setFrom
}) {
  const handleSubmitOnClick = () => {
    setFlights([]);
    const data = {
      fly_from: from,
      fly_from_city: fromCity,
      fly_to: desination,
      fly_to_city: toCity,
      price,
      // url: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSNy5MlPWw65goD3Mqow7kGiF9iYfFPlQgc_Ie7sJTSNK84RJ9uAK4rAuaf6Lis1YYt5qzwAjy7dLfeuKFZgEgI0E7tsLFMyOklGP3cEOo',
    };
    axios.post('flightlist', data)
      .then((res) => { console.log(res); getData(); });
    setAddFlightOnClick(false);
    setTo('')
    setFrom('')
  };
  const [depart, setDepart] = useState('');
  const [des, setDet] = useState('');
  const [price, setPrice] = useState('');

  return (
    <Container>
      From
      <input value={from} onChange={(e) => setDepart(e.target.value)} />
      To
      <input value={desination} onChange={(e) => setDet(e.target.value)} />
      Price
      <input onChange={(e) => setPrice(e.target.value)} />
      <button type="submit" onClick={() => handleSubmitOnClick()}>Submit</button>
    </Container>
  );
}

AddFlight.propTypes = {
  getData: PropTypes.func.isRequired,
  from: PropTypes.string.isRequired,
  desination: PropTypes.string.isRequired,
  setFlights: PropTypes.func.isRequired,
};

export default AddFlight;
