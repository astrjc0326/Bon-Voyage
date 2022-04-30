import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Logo from '../assert/Logo.jsx';
import Search from './Search.jsx';
import FlightList from './FlightList/FlightList.jsx';
import TravelJournal from './TravelJournal/TravelJournal.jsx';
import Login from './Login.jsx';
import SearchAirport from './SearchAirport/SearchAirport.jsx';
import axios from 'axios'

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #1572A1;
  color: #EFDAD7
`
const Container = styled.div`
  padding: 20px
`

const App = () => {
  const [number, setNumber] = useState(1);
  const [window, setWindow] = useState('');
  const exampleData = {fly_from: 'SFO', flightlist:
    [ {flight_to: 'TPE', price: 500},
      {flight_to: 'LON', price: 480}]
  }
  // const getFlight = () => {
  //   const query = {
  //     fly_from: 'SFO',
  //     fly_to: 'TPE',
  //     date_from: '28/4/2022',
  //     curr: 'USD'
  //   }
  //   const headers = {
  //     apikey: 'LtW_J16JSqMppDXbbStSCupp_jPfoiY5'
  //   }
  //   axios.get('https://tequila-api.kiwi.com/v2/search', {
  //     params: query,
  //     headers: headers
  //   })
  //   .then(res => console.log(res.data.data[0], res.data.data[0].price))
  //   .catch(err => console.log(err))
  // }
  // useEffect(() => {
  //   getFlight()
  // },[]);
  const showLogin = (window === 'login') ? <Login /> : ''
  const showFlightList = (window === 'flightlist') ? <FlightList exampleData={exampleData}/> : ''
  const showJournal = (window === 'journal') ? <TravelJournal /> : ''

  return (
    <div>
      <Navbar>
        <div style={{padding: '10px'}}><h1>BonVoyage</h1><Logo /></div>
      <div>
      <button onClick={() => {setWindow('flightlist')}}>My Trip</button>
      <button onClick={() => {setWindow('journal')}}>My Journal</button>
      <button onClick={() => {setWindow('login')}}>Sign In</button>
      </div>
      </Navbar>
      <Container>
      <Search />
      <h2>Where are you going?</h2>
      <SearchAirport />

      {showLogin}
      {showFlightList}
      {showJournal}
      </Container>
    </div>)
}

export default App