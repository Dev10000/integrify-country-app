//import data from './country_data';
const data = require('./country_data');

const mapped = data.map((country, index) => ({
  name: country.name.common,
  population: country.population,
  languges: country.languages
    ? Object.values(country.languages).join(', ')
    : country.languages,
  //languges: country.languages,
  region: country.region,
  flag: country.flags.png,
  ccn3: country.ccn3,
  row: index.toString(),
}));

console.log(mapped);
