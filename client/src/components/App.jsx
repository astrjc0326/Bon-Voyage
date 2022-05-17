import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Logo from '../assert/Logo.jsx';
import Search from './Search.jsx';
import FlightList from './FlightList/FlightList.jsx';
import TravelJournal from './TravelJournal/TravelJournal.jsx';
import Login from './Login.jsx';
import SearchAirport from './SearchAirport/SearchAirport.jsx';

const AppContainer = styled.div`
  align-items: center;
`;

const LogoDiv = styled.div`
  padding:20px;
  padding-left: 800px
`;

const Navbar = styled.div`
  background-color: #0A4183;
  color: #EFDAD7
`;
const Container = styled.div`
  left: 30%;
  height: 650px;
  overflow: auto;
  width: 650px;
  margin-left: 600px
`;

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin: 3px
`;

const Footer = styled.footer`
  margin-left: 35%;
`;

const Greet = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 20px
`;

const App = () => {
  // const showLogin = (window === 'login') ? <Login /> : ''

  const getData = () => {
    axios.get('flightlist')
      .then((res) => { console.log(res.data); setData(res.data); })
      .catch();
  };

  useEffect(() => {
    getData();
  }, []);
  // const [number, setNumber] = useState(1);
  const [window, setWindow] = useState('');
  const [showSignIn, setShowSignin] = useState(false);
  const [data, setData] = useState([]);
  const [isSignIn, setisSignIn] = useState(false);

  const showFlightList = (window === 'flightlist') ? <FlightList data={data} getData={getData} /> : '';
  const showJournal = (window === 'journal') ? <TravelJournal /> : '';

  return (
    <AppContainer>
      <Navbar>
        <LogoDiv>
          {/* <h1>BonVoyage</h1> */}
          <Logo />
          {' '}
          <div style={{paddingLeft: '40px' }}>
            {(isSignIn) ? <Button onClick={() => { setWindow('flightlist'); }}>My Trip</Button> : ''}
            {(isSignIn) ? <Button onClick={() => { setWindow('journal'); }}>New Journey</Button> : ''}
            {(!isSignIn) ? (
              <Greet>
                <Button onClick={() => { setShowSignin(true); }}>
                  <label>
                  <span class="material-symbols-outlined">
                    face
                 </span>
                  </label>
                </Button>
              </Greet>
            ) : <Greet><h2>Hello Anny</h2></Greet>}
          </div>
        </LogoDiv>

      </Navbar>

      <Container>
        {/* <Search /> */}
        <SearchAirport getData={getData} isSignIn={isSignIn} />

        {(showSignIn) ? <Login onClose={setShowSignin} setisSignIn={setisSignIn} /> : ''}
        {showFlightList}
        {showJournal}
      </Container>
      <hr />

      <Footer>
        <p>
          <a>About</a>
          <a>Privacy</a>
          <a>Terms</a>
          <a>Join user studies</a>
          <a>Feedback</a>
          <a>Help Center</a>
        </p>
      </Footer>

    </AppContainer>
  );
};

export default App;
