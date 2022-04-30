import React, { useState } from 'react';
import axios from 'axios';
import Loading from '../../assert/Loading.jsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`
const DropDown = styled.table`
  background-color: rgb(232, 231, 231);
`

const SearchAirport = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromDropDown, setFromDropDown] = useState([]);
  const [toDropDown, setToDropDown] = useState([]);
  const handleChange = (airport) => {
    let result;
    if (airport.length > 3) {
      axios.get(`/airport?term=${airport}`)
      .then(res =>  {console.log(res.data); setToDropDown(res.data)})
    }
  }
  const airports = toDropDown.map(country => (
    <tr>
      <td>{country.name}</td>
    </tr>
  ))
  return (
    <Container>
      <div>
      <DropDown>
    <input
      placeholder='To'
      onChange={
        (e) => {
          handleChange(e.target.value);
        }}
    >
        </input>
        <tbody>
          {airports}
        </tbody>
        </DropDown>
        </div>
    <div>
    <DropDown>
      <input placeholder='From'></input>

      </DropDown>
    </div>
    <input></input>
    <input></input>
    <button>search</button>
    <Loading />
    </Container>
  )
}

export default SearchAirport;