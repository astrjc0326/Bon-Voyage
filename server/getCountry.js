const axios = require('axios');

module.exports = {
  getCountry: (callback) => {
    axios.get(`http://api.countrylayer.com/v2/all?access_key=${process.env.COUNTRY_LAYER_API}`)
      .then((res) => { console.log(res); callback(null, res); });
  },

};
