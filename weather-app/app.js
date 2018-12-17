
const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h').argv;

var encodedAddress = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyBni0WHAK4XjOGQ03txOQTcA0XqB1oLTx4`;

axios
  .get(geocodeUrl)
  .then(res => {
    if (res.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address');
    }

    const lat = res.data.results[0].geometry.location.lat;
    const lng = res.data.results[0].geometry.location.lng;
    const weatherUrl = `https://api.darksky.net/forecast/4d4837ee121f10d5d57609a25109328d/${lat},${lng}`;
    console.log(res.data.results[0].formatted_address);
    return axios.get(weatherUrl);
  })
  .then(res => {
    const temperature = res.data.currently.temperature;
    const apparentTemperature = res.data.currently.apparentTemperature
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`)
  })
  .catch(err => {
    if (err.code === 'ETIMEDOUT') {
      console.log('Unable to connect to API servers');
    } else {
      console.log(err.message);
    }
  });
