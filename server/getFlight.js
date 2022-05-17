const axios = require('axios');
const { sendMail } = require('./sendMail.js');
const { sentRemain } = require('./db.js');

module.exports = {
  getFlight: (id, from, to, price) => {
    const query = {
      fly_from: from,
      fly_to: to,
      // date_from: '11/5/2022',
      flight_type: 'round',
      max_stopover: 1,
      nights_in_dst_from: 7,
      nights_in_dst_to: 28,
      curr: 'USD',
    };
    const headers = {
      apikey: 'LtW_J16JSqMppDXbbStSCupp_jPfoiY5',
    };
    axios.get('https://tequila-api.kiwi.com/v2/search', {
      params: query,
      headers,
    })
      .then((res) => {
      // console.log(res.data.data[0], res.data.data[0].price)
        const flightInfo = res.data.data[0];
        if (flightInfo.price <= price) {
          sendMail(
            flightInfo.cityFrom,
            flightInfo.flyFrom,
            flightInfo.cityTo,
            flightInfo.flyTo,
            flightInfo.price,
            flightInfo.deep_link,
            (err, result) => {
              if (err) {
                console.log('can not send email ');
              } else {
                console.log('send email successfully');
                sentRemain(id, (err, res) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log(`there is price for ${flightInfo.cityFrom} to ${flightInfo.cityTo}`);
                  }
                });
              }
            },
          );
        } else {
          console.log(`no flight for ${to} for ${price}`);
        }
      })
      .catch((err) => console.log(err));
  },
};
