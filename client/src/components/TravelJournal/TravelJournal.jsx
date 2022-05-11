import React, { useState, useEffect } from 'react';
import axios from 'axios';
import allcountries from '../../assert/countries.js';
import PhotoEntry from './PhotoEntry.jsx';

const TravelJournal = () => {
  const [number] = useState(Math.floor(Math.random() * 250));
  const [i, setI] = useState(0);
  const [country] = useState([allcountries[number]]);
  // const [photo, setPhoto] = useState([]);
  const photo = ['https://images.unsplash.com/photo-1603416547763-c637d96f5fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjYxNDV8MHwxfHNlYXJjaHwxfHxUYW95dWFufGVufDB8fHx8MTY1MjIyMjgwOQ&ixlib=rb-1.2.1&q=80&w=400', 'https://images.unsplash.com/photo-1603416547763-c637d96f5fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjYxNDV8MHwxfHNlYXJjaHwxfHxUYW95dWFufGVufDB8fHx8MTY1MjIyMjgwOQ&ixlib=rb-1.2.1&q=80&w=400', 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjYxNDV8MHwxfHNlYXJjaHwxfHxQYXJpc3xlbnwwfHx8fDE2NTIyODU2NTM&ixlib=rb-1.2.1&q=80&w=400'];

  // useEffect(() => {
  //   axios.get(`/photos/${country[0].name}`)
  //     .then((res) => {console.log(res); setPhoto(res.data)});
  // }, []);
  // useEffect(() => {
  //   axios.get(`https://en.wikipedia.org/w/api.php?action=opensearch&search=${country[0].name}`)
  //     .then((res) => console.log(res.json()))
  //     .catch()
  // }, []);
  const photos = photo.map((pho) => (<PhotoEntry photo={pho} />));
  const lastOnClick = () => {
    const n = i - 1;
    setI(n);
  };
  const nextOnClick = () => {
    const n = i + 1;
    setI(n);
  };

  return (
    <div>
      {/* <h1>Choose a place to visit</h1> */}
      <h1
        onClick={() => window.open(`https://en.wikipedia.org/wiki/${country[0].name}`)}
      >
        {country[0].name}
      </h1>

      <div style={{ display: 'flex', height: 'auto', width: '403px' }}>
        <div style={{ lineHeight: '250px' }}>
          {(i !== 0)
            ? (
              <button type="button" style={{ height: '200px' }} onClick={() => lastOnClick()}>
                last
              </button>
            )
            : ''}
        </div>
        <div style={{ height: 'auto', width: '400px' }}>
          {photos[i]}
        </div>
        {(i < 2)
          ? (
            <div style={{ lineHeight: '250px' }}>
              <button type="button" style={{ height: '200px' }} onClick={() => nextOnClick()}>next</button>
            </div>
          )
          : ''}
      </div>
      <h2>
        Capital:
        {' '}
        {country[0].capital}
      </h2>
      <h2>
        Region:
        {' '}
        {country[0].region}
      </h2>
    </div>
  );
};

export default TravelJournal;
