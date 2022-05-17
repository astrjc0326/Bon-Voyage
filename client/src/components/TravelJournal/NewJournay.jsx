import React, { useState, useEffect } from 'react';
import axios from 'axios';
import allcountries from '../../assert/countries.js';
import PhotoEntry from './PhotoEntry.jsx';

const NewJournay = () => {
  const [number] = useState(Math.floor(Math.random() * allcountries.length));
  const [i, setI] = useState(0);
  const [totalphoto, setTotalPhoto] = useState(0)
  const [country] = useState([allcountries[number]]);
  const [photo, setPhoto] = useState([]);
  // const photo = ['https://images.unsplash.com/photo-1603416547763-c637d96f5fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjYxNDV8MHwxfHNlYXJjaHwxfHxUYW95dWFufGVufDB8fHx8MTY1MjIyMjgwOQ&ixlib=rb-1.2.1&q=80&w=400', 'https://images.unsplash.com/photo-1603416547763-c637d96f5fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjYxNDV8MHwxfHNlYXJjaHwxfHxUYW95dWFufGVufDB8fHx8MTY1MjIyMjgwOQ&ixlib=rb-1.2.1&q=80&w=400', 'https://images.unsplash.com/photo-1522093007474-d86e9bf7ba6f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMjYxNDV8MHwxfHNlYXJjaHwxfHxQYXJpc3xlbnwwfHx8fDE2NTIyODU2NTM&ixlib=rb-1.2.1&q=80&w=400'];

  useEffect(() => {
    axios.get(`/photos/${country[0].capital}`)
      .then((res) => {console.log(res); setPhoto(res.data); setTotalPhoto(res.data.length)});
  }, []);
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
    <div style={{ textAlign: 'center' }}>
      {/* <h1>Choose a place to visit</h1> */}
      <h1
        onClick={() => window.open(`https://en.wikipedia.org/wiki/${country[0].name}`)}
        onClick={() => {}}
      >
        {country[0].name}
      </h1>

      <div style={{ display: 'flex', height: 'auto', width: '403px', paddingLeft:'100px' }}>
        <div style={{ height: 'auto', width: '400px', display: 'flex' }}>
          {(i !== 0)
            ? (
              <button type="button" style={{ height: '200px' }} onClick={() => lastOnClick()}>
                <label>
                  <span className="material-symbols-outlined">
                    arrow_back_ios
                  </span>
                </label>

              </button>
            )
            : <div style={{ height: 'auto', width: '400px' }} />}
          {photos[i]}
          {(i < totalphoto - 1)
            ? (
              <div style={{ lineHeight: '250px' }}>
                <button type="button" style={{ height: '200px' }} onClick={() => nextOnClick()}>
                  <label>
                    <span className="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </label>

                </button>
              </div>
            )
            : ''}
        </div>

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

export default NewJournay;
