import React from 'react';
import moment from 'moment';
import styled from 'styled-components';

const FlightContainer = styled.div`
  padding: 20px
`

const PriceContainer = styled.div`
  display: flex;
  justify-content: space-around
`

const FlightEntry = ({ flights }) => {
  const handleClick = (link) => {
    window.open(link)
  }
   const flightEntry = flights.map(flight => (
    <div key={flight.id}>
      <div style={{padding: '10px 0px'}}>{flight.cityFrom}({flight.flyFrom}) -- {flight.cityTo}({flight.flyTo})</div>
      <PriceContainer>
      <div>{moment(flight.local_departure).format('MM/DD')} -- {moment(flight.local_arrival).format('MM/DD')}</div>
      <h3>${flight.price}</h3>

    <button onClick={() => handleClick(flight.deep_link)}>Book</button></PriceContainer>
    </div>
  ))
  return (
  <FlightContainer>
    {console.log(flights)}
    {flightEntry}
  </FlightContainer>
  )
}

export default FlightEntry;