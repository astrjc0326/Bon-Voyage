import React from 'react';
import styled from 'styled-components';
import DestinationList from './DestinationList.jsx';
import AddFlight from './AddFlight.jsx';

const FlightList = ({ data, getData }) => (
  <div>
    {/* <AddFlight /> */}
    <h1>Flight List</h1>
    {/* <h2>Leaving From: {exampleData.fly_from}</h2> */}

    <DestinationList flightlist={data} getData={getData} />

  </div>
);

export default FlightList;
