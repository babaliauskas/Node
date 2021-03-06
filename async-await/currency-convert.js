const axios = require('axios');

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(
      'http://data.fixer.io/api/latest?access_key=65f1d2c6049bd37947a4b7ceff11b7d6&format=1'
    );
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if (isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}`);
  }
};

const getCountries = async currencyCode => {
  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/currency/${currencyCode}`
    );
    return response.data.map(country => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }
};

const convertCurrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const countries = await getCountries(to);
  const convertedAmount = (rate * amount).toFixed(2);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(
    ', '
  )} `;
};

convertCurrency('USD', 'CAD', 20)
  .then(message => console.log(message))
  .catch(e => console.log(e.message));
