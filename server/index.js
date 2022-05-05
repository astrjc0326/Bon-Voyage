require("dotenv").config();
const express = require("express");
const path = require("path");
const save = require('./db.js').save;
const get = require('./db.js').get;
const deleteFlight = require('./db.js').deleteFlight;
const update = require('./db.js').update;
const getFlight = require('./getFlight').getFlight
const axios = require('axios')

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

// send the email
app.get('/email', (req, res) => {
  sendMail((err, result) => {
    if (err) {
      res.sendStatus(404)
    } else {
      res.sendStatus(200)
    }
  })
})
app.get('/airport', (req, res) => {
  console.log(req.query.term)
  const headers = {
    "APC-Auth": process.env.AIRPORT_API,
    "APC-Auth-Secret": process.env.AIRPORT_API_SECRET
  }
  axios.get(`https://www.air-port-codes.com/api/v1/autocomplete?term=${req.query.term}`, {
    headers: headers
  })
  .then(response => res.send(response.data.airports))
  .catch(err => console.log('can not get the IATA', err))
})

app.get('/flights', (req, res) => {
  let query = req.query;
  query.curr = 'USD';
  // query.one_for_city = 1;
  // query.flight_type = 'round';
  // query.max_stopover = 0;
  // query.nights_in_dst_from = 7;
  // query.nights_in_dst_to = 28;
  const headers = {
    apikey: process.env.FLIGHT_API
  }
  axios.get('https://tequila-api.kiwi.com/v2/search', {
    params: query,
    headers: headers
  })
  .then(response => { console.log(response.data); res.send(response.data)} )
  .catch(err => console.log(err))
})

app.get('/flightlist', (req, res) => {
  console.log('get flightlists');
  get((err, result) => {
    if (err) {
      console.log(err)
    } else {
      res.send(result)
      console.log(result, 'result')
      result.forEach(flight => {
        getFlight(flight.fly_from, flight.fly_to, flight.price)
      })
    }
  })

})

app.post('/flightlist', (req, res) => {
  console.log('post')
  save(req.body, (err, response) => {
    console.log(err)
    if (!err) {
      res.sendStatus(201);
    }
  })
})

app.put('/flightlist', (req, res) => {
  console.log(req.body)
  update(req.body, (err, result) => {
    if (err) {
      console.log(err)
      res.sendStatus(501)
    } else {
      res.sendStatus(204)
    }
  })
})

app.delete('/flightlist/:id', (req, res) => {
  deleteFlight(req.params.id, (err, result) => {
    if (err) {
      res.sendStatus(501)
    } else {
      res.sendStatus(200)
    }
  })
})

app.get('/photos', (req, res) => {
  axios.get('https://api.unsplash.com/search/photos', {
    params: {query: 'paris'},
    headers: {'client_id' :process.env.PIC_API_KEY}
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))

})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
