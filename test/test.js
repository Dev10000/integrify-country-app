//import data from './country_data';
const data = require('./country_data');
const single_country_data = require('./single_country_data');

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

const singleMapped = Object.entries(single_country_data).filter(
  (item) => typeof single_country_data[item[0]] !== 'object'
);

const arrayItems = Object.entries(single_country_data).filter(
  (item) => single_country_data[item[0]] instanceof Array
);

const objectItems = Object.entries(single_country_data).filter(
  (item) => single_country_data[item[0]] instanceof Object
);

// const singleMapped2 = single_country_data.map((item) => {
//   console.log(item);
// });
console.log(objectItems);
// console.log(singleMapped2);
