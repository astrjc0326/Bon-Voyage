const axios = require('axios');
const sendMail = require('./sendMail.js').sendMail
const sentRemain = require('./db.js').sentRemain

module.exports = {
  getFlight: (id, from, to, price) => {
    const query = {
      fly_from: from,
      fly_to: to,
      date_from: '28/4/2022',
      curr: 'USD',
    };
    const headers = {
      apikey: 'LtW_J16JSqMppDXbbStSCupp_jPfoiY5'
    }
    axios.get('https://tequila-api.kiwi.com/v2/search', {
      params: query,
      headers: headers
    })
    .then(res => {
      // console.log(res.data.data[0], res.data.data[0].price)
      const flightInfo = res.data.data[0]
      if (flightInfo.price <= price) {
        sendMail(flightInfo.cityFrom, flightInfo.flyFrom, flightInfo.cityTo, flightInfo.flyTo, flightInfo.price, flightInfo.deep_link, (err, result)=> {
          if (err) {
            console.log('can not send email ')
          } else {
            console.log('send email successfully')
            sentRemain(id, (err, result) => {
              if (err) {
                console.log(err)
              } else {
                console.log(result)
              }
            })
          }
        })
      } else {
        console.log(`no flight for ${to} for ${price}`)
      }
    })
    .catch(err => console.log(err))
  }
}