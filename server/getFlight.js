const axios = require('axios')

const getFlight = () => {
  const query = {
    fly_from: 'SFO',
    fly_to: 'TPE',
    date_from: '28/4/2022',
    curr: 'USD'
  }
  const headers = {
    apikey: 'LtW_J16JSqMppDXbbStSCupp_jPfoiY5'
  }
  axios.get('https://tequila-api.kiwi.com/v2/search', {
    params: query,
    headers: headers
  })
  .then(res => console.log(res.data.data[0], res.data.data[0].price))
  .catch(err => console.log(err))