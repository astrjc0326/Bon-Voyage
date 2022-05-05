import React from 'react';
import DestinationEntry from './DestinationEntry.jsx';
import AddFlight from './AddFlight.jsx';
import styled from 'styled-components';


const FlightList = ( { data, getData } ) => {
  return(
  <div>
    {/* <AddFlight /> */}
    <h1>Flight List</h1>
    {/* <h2>Leaving From: {exampleData.fly_from}</h2> */}

    <DestinationEntry flightlist={data} getData={getData}/>

  </div>
  )
}

export default FlightList;