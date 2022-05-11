import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import DestinationEntry from './DestinationEntry.jsx'

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
`;

const DestinationTable = styled.table`
  font-size: 20px
`;

const DestinationList = ({ flightlist, getData }) => {
  const countries = flightlist.map((country) =>
    <DestinationEntry country={country} getData={getData} />);

  return (
    <div>
      <DestinationTable>
        <thead>
          <th />
          <th />
          <th />
        </thead>
        <tbody>
          {countries}
        </tbody>
      </DestinationTable>
    </div>

  );
};

export default DestinationList;
