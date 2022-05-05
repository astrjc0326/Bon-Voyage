import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../Modal.jsx'

const Button = styled.td`
  cursor: pointer;
  padding: 20px;

  &:hover {
    color: #1572A1;
    text-decoration: underline
  }
`

const Submit = styled.button`
  padding: 10px;
  font-size: 15px
`
const Input = styled.input`
  font-size: 15px
`

const Td = styled.td`
  padding: 10px
`

const DestinationTable = styled.table`
  font-size: 20px
`

const DestinationEntry = ( { flightlist, getData } ) => {
  const contries = flightlist.map(country => {
    const [editOnClick, seteditOnClick] = useState(false);
    const [price, setPrice] = useState();
    const handleSubmitOnClick = (country) => {
      const data = {
        _id: country._id,
        price
      }
      axios.put('flightlist', data)
      .then (res => {console.log(res); seteditOnClick(false); getData()
      })
      .catch()

    }
    const handleDeleteOnClick = (id) => {
      axios.delete(`/flightlist/${id}`)
        .then(res => {console.log(res); getData()})
        .catch()
    }
    return (
  <tr key={country._id}>
    <Td>
    <img style={{width: '180px'}} src={country.url}></img>
    </Td>
    <Td>
      {country.fly_from} - {country.fly_to}
    </Td>
    <Td>
      ${country.price}
    </Td>
    <Button onClick={(e) => {console.log('click'); seteditOnClick(true)}}>
      Edit Price
    </Button>
    {editOnClick ? <Modal content={<table>    <Td>
    <img style={{width: '180px'}} src={country.url}></img>
    </Td>
    <Td>
       {country.fly_from} - {country.fly_to}
    </Td>
    <Td><Input onChange={(e) => setPrice(e.target.value)}></Input>
    </Td><Td><Submit onClick={() => handleSubmitOnClick(country)}>Submit</Submit></Td></table>} onClose={() => seteditOnClick(false)}/> : ''}
    <Button onClick={() => handleDeleteOnClick(country._id)}>
      Delete
    </Button>
  </tr>
  )})
return (
  <div>
    <DestinationTable>
      <thead>
      <th></th>
      <th></th>
      <th></th>
      </thead>
      <tbody>
    {contries}
    </tbody>
    </DestinationTable>
  </div>

)

}

export default DestinationEntry