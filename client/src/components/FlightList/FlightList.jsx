import React from 'react';
import DestinationEntry from './DestinationEntry.jsx';
import styled from 'styled-components';


const FlightList = ( { exampleData } ) => {
  return(
  <div>
    <h1>Flight List</h1>

    <p>Leaving From: {exampleData.fly_from}</p>
    <DestinationEntry flightlist={exampleData.flightlist}/>

  </div>
  )
}

export default FlightList;