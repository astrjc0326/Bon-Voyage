require('dotenv').config();
const express = require('express');
const path = require('path');
const axios = require('axios');
const {
  save, get, deleteFlight, update, sentRemain,
} = require('./db');
// const { get } = require('./db');
// const { deleteFlight } = require('./db');
// const { update } = require('./db');
const { getFlight } = require('./getFlight');

const app = express();
let flights;
// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.json());

app.get('/airport', (req, res) => {
  console.log(req.query.term);
  const headers = {
    'APC-Auth': process.env.AIRPORT_API,
    'APC-Auth-Secret': process.env.AIRPORT_API_SECRET,
  };
  axios.get(`https://www.air-port-codes.com/api/v1/autocomplete?term=${req.query.term}`, {
    headers,
  })
    .then((response) => res.send(response.data.airports))
    .catch((err) => console.log('can not get the IATA', err));
});

app.get('/flights', (req, res) => {
  const { query } = req;
  query.curr = 'USD';
  // query.one_for_city = 1;
  query.flight_type = 'round';
  query.max_stopover = 1;
  query.nights_in_dst_from = 7;
  query.nights_in_dst_to = 28;
  const headers = {
    apikey: process.env.FLIGHT_API,
  };
  axios.get('https://tequila-api.kiwi.com/v2/search', {
    params: query,
    headers,
  })
    .then((response) => { console.log(response.data); res.send(response.data); })
    .catch((err) => console.log('can not get flight'));
});

app.get('/flightlist', (req, res) => {
  console.log('get flightlists');
  get((err, result) => {
    if (err) {
      console.log('cant not get flight list');
    } else {
      res.send(result);
      result.forEach((flight) => {
        if (flight.isRemained) { return }
        getFlight(flight._id, flight.fly_from, flight.fly_to, flight.price);
      });
    }
  });
});

app.post('/flightlist', (req, res) => {
  console.log(`getting photo to ${req.body.fly_to_city}`)
  axios.get(`https://api.unsplash.com/search/photos?per_page=1&query=${req.body.toCountry}`, {
    headers: { Authorization: 'Client-ID DecrbDWxfD4E79MPuxkQ89mUySzFeWnHqM6KG7ykXZk' },
  })
    .then((response) => {
      req.body.url = response.data.results[0].urls.thumb;
      delete req.body.toCountry;
      console.log(req.body);
      save(req.body, (err) => {
        if (!err) {
          res.sendStatus(201);
        } else {
          console.log('can not add flight into db');
        }
      });
    })
    .catch(() => console.log('cant get the photo from api'));
});

app.put('/flightlist', (req, res) => {
  console.log(req.body);
  update(req.body, (err, result) => {
    if (err) {
      console.log('can not update the price of the flight');
      res.sendStatus(501);
    } else {
      console.log('update price successfully');
      res.sendStatus(204);
    }
  });
});

app.delete('/flightlist/:id', (req, res) => {
  deleteFlight(req.params.id, (err, result) => {
    if (err) {
      console.log('can not delete the flight');
      res.sendStatus(501);
    } else {
      console.log('delete the flight successfully');
      res.sendStatus(200);
    }
  });
});

app.get('/photos/:country', (req, res) => {
  axios.get(`https://api.unsplash.com/search/photos?per_page=3&query=${req.params.country}`, {
    headers: { Authorization: 'Client-ID DecrbDWxfD4E79MPuxkQ89mUySzFeWnHqM6KG7ykXZk' },
  })
    .then((response) => {
      const result = response.data.results.map((photo) => photo.urls.small);
      console.log('get the photo successfully');
      res.send(result);
    })
    .catch(() => console.log('can not get photos'));
});

// setInterval(() => {
//   if (flights) {
//     console.log('search ticket');
//     flights.forEach((flight) => {
//       if (flight.isRemained) { return; }
//         getFlight(flight._id, flight.fly_from, flight.fly_to, flight.price);
//     });
//   }
// }, 10000);

// app.put('/remain/:id', (req, res) => {
//   sentRemain(req.params.id, (err, result) => {
//     if (!err) {
//       res.send(201);
//     } else {
//       console.log(err);
//     }
//   })
// })

app.listen(process.env.PORT, () => {
  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
