import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Modal from '../Modal.jsx';

const Button = styled.td`
  cursor: pointer;
  padding: 20px;

  &:hover {
    color: #1572A1;
    text-decoration: underline
  }
`;

const Submit = styled.button`
  padding: 10px;
  font-size: 15px
`;

const Input = styled.input`
  font-size: 15px
`;

const Td = styled.td`
  padding: 10px
  width: auto
`;

const DestinationEntry = ({ country, getData }) => {
  const handleDeleteOnClick = (id) => {
    axios.delete(`/flightlist/${id}`)
      .then((res) => { console.log(res); getData(); })
      .catch();
  };
  const [editOnClick, seteditOnClick] = useState(false);
  const [price, setPrice] = useState();

  const handleSubmitOnClick = (country) => {
    const data = {
      _id: country._id,
      price,
    };
    axios.put('flightlist', data)
      .then((res) => {
        console.log(res); seteditOnClick(false); getData();
      })
      .catch();
  };

  return (
    <tr key={country._id}>
      <Td>
        <img style={{ width: '180px' }} src={country.url} />
      </Td>
      <Td>
        {country.fly_from}
        {' '}
        -
        {' '}
        {country.fly_to}
        <br />
        <p style={{ fontSize: '15px' }}>
          {country.fly_from_city}
          {' '}
          -
          {' '}
          {country.fly_to_city}

        </p>
      </Td>
      <Td>
        $
        {country.price}
      </Td>
      <Button onClick={() => { console.log('click'); seteditOnClick(true); }}>
        Edit Price
      </Button>
      {editOnClick ? (
        <Modal
          content={(
            <table>
              {' '}
              <Td>
                <img style={{ width: '180px' }} src={country.url} />
              </Td>
              <Td>
                {country.fly_from}
                {' '}
                -
                {country.fly_to}
              </Td>
              <Td>
                <Input onChange={(e) => setPrice(e.target.value)} />
              </Td>
              <Td><Submit onClick={() => handleSubmitOnClick(country)}>Submit</Submit></Td>
            </table>
)}
          onClose={() => seteditOnClick(false)}
        />
      ) : ''}
      <Button onClick={() => handleDeleteOnClick(country._id)}>
        Delete
      </Button>
    </tr>
  );
};

export default DestinationEntry;
