require("dotenv").config();
const express = require("express");
const path = require("path");
const save = require('./db.js').save;
const get = require('./db.js').get;
const deleteWord = require('./db.js').deleteWord;
const update = require('./db.js').update;
const filter = require('./db.js').filter;
const count = require('./db.js').count;
const axios = require('axios')
const nodemailer = require('nodemailer');

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(express.json());

// send the email
app.get('/email', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAILPW
    }
  })
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'astrjc.anny@gmail.com',
    subject: 'Hello',
    text: 'That was cool!'
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err)
      res.sendStatus(404)
    } else {
      console.log('Email sent', info.response)
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

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
