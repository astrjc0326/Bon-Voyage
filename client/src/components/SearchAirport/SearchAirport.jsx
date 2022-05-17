import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import styled from 'styled-components';
import Loading from '../../assert/Loading.jsx';
import FlightEntry from './FlightEntry.jsx';
import AddFlight from '../FlightList/AddFlight.jsx';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 30px 0px 30px 0px;
`;

const DropDown = styled.table`
  background-color: rgb(232, 231, 231);
`;

const AddButton = styled.button`
  width: 100%;
  height: 50px
`;

const Airport = styled.td`
  &:hover,
  &:focus {
    color: #1572A1;
    text-decoration: none;
    cursor: pointer;
  }
`;

const SearchAirport = ({ getData, isSignIn }) => {
  const [from, setFrom] = useState('');
  const [fromIATA, setFromIATA] = useState('');
  const [fromCity, setFromCity] = useState('');
  const [toIATA, setToIATA] = useState('');
  const [to, setTo] = useState('');
  const [toCity, setToCity] = useState('');
  const [fromDropDown, setFromDropDown] = useState([]);
  const [toCountry, setCountryName] = useState('')
  const [toDropDown, setToDropDown] = useState([]);
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [isLoading, setisLoading] = useState();
  const [AddFlightOnClick, setAddFlightOnClick] = useState(false);

  const handleChange = (airport, setFlight) => {
    let result;
    axios.get(`/airport?term=${airport}`)
      .then((res) => { console.log(res.data); setFlight(res.data); })
      .catch();
  };
  const searchFlights = () => {
    setisLoading(true);
    setFlights([]);
    const transFromDate = moment(departDate).format('DD/MM/YYYY').toString();
    const transReturnDate = moment(returnDate).format('DD/MM/YYYY').toString();
    const query = {
      fly_from: fromIATA,
      fly_to: toIATA,
      date_from: transFromDate,
      // date_to: transReturnDate
    };
    axios.get('/flights', { params: query })
      .then((res) => { console.log(res); setFlights(res.data.data); setisLoading(false); })
      .catch();
  };
  const fromAirports = (fromDropDown.length !== 0)
    ? fromDropDown.map((country) => (
      <tr>
        <Airport onClick={() => {
          setFromCity(country.city);
          setFrom(country.name);
          setFromIATA(country.iata); setFromDropDown([]);
        }}
        >
          {country.name}

        </Airport>
      </tr>
    ))
    : '';
  const toAirports = (toDropDown.length !== 0)
    ? toDropDown.map((country, index) => (
      <tr key= { index }>
        <Airport onClick={() => {
          setToCity(country.city);
          setCountryName(country.country.name);
          setTo(country.name);
          setToIATA(country.iata); setToDropDown([]);
        }}
        >
          {country.name}

        </Airport>
      </tr>
    ))
    : '';

  return (
    <div>
      <h2 style={{ padding: '30px 0px 30px 0px' }}>Where are you going?</h2>

      <Container>
        <div>
          <DropDown>
            <input
              placeholder="From"
              value={from}
              onChange={
        (e) => {
          setFrom(e.target.value);
          handleChange(e.target.value, setFromDropDown);
        }
}
            />
            <tbody>
              {fromAirports}
            </tbody>
          </DropDown>
        </div>
        <button onClick={() => {
          const savefromCity = fromCity;
          const savefrom = from;
          const savefromIATA = fromIATA;
          setFrom(to);
          setFromIATA(toIATA);
          setFromCity(toCity);
          setTo(savefrom);
          setToIATA(fromIATA);
          setToCity(savefromCity);
        }}
        >
          <label>
            {' '}
            <span className="material-symbols-outlined">
              swap_horiz
            </span>
          </label>
        </button>

        <div>

          <DropDown>
            <input
              placeholder="To"
              value={to}
              onChange={
        (e) => {
          setTo(e.target.value);
          handleChange(e.target.value, setToDropDown);
        }
      }
            />
            <tbody>
              {toAirports}
            </tbody>
          </DropDown>
        </div>
        <input id="depart_input" type="date" onChange={(e) => setDepartDate(e.target.value)} />
        {/* <button type='button'>
      <label htmlFor='depart_input'>
        Depart
      </label>
    </button> */}

        <input placeholder="Return" type="date" onChange={(e) => setReturnDate(e.target.value)} />
        <button onClick={() => searchFlights()}>
          <span className="material-symbols-outlined">
            search
          </span>
        </button>

      </Container>
      {isSignIn ? <AddButton onClick={() => { setAddFlightOnClick(true); setFlights([])}}>Add to Flight List</AddButton> : ''}

      {AddFlightOnClick ? (
        <AddFlight
          from={fromIATA}
          fromCity={fromCity}
          toCity={toCity}
          desination={toIATA}
          getData={getData}
          setFlights={setFlights}
          setAddFlightOnClick={setAddFlightOnClick}
          setTo={setTo}
          setFrom={setFrom}
          toCountry={toCountry}
        />
      ) : ''}
      <FlightEntry flights={flights} />
      {isLoading ? <div style={{ position: 'relative', left: '50%' }}><Loading /></div> : ''}

    </div>
  );
};

export default SearchAirport;
