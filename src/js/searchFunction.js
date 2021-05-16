import countriesCard from '../templates/country-card.hbs';
import listCountries from '../templates/country-list.hbs';
import OnSerch from './fetchCountries';
import { error } from './error';
const debounce = require('lodash.debounce');
const containerCard = document.querySelector('.data-container');
const inputEl = document.querySelector('.input-field');

inputEl.addEventListener('input', debounce(onSerchCountries, 500));
const onSerch = new OnSerch();

function onSerchCountries(e) {
  clearContainer();
  if (e.target.value.length < 1) {
    return;
  }
  onSerch.query = e.target.value;
  onSerch
    .serchCountries()
    .then(createMarkup)
    .catch(error => {
      alert('something goes wrong...');
    });
}

function createMarkup(data) {
  if (data.length === 1) {
    createMarkupCard(data);
  } else if (data.length > 1 && data.length <= 10) {
    createMarkupList(data);
  } else if (data.length > 10) {
    error({
      title: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });
  }
}

function createMarkupCard(data) {
  const markup = countriesCard(data);
  containerCard.insertAdjacentHTML('beforeend', markup);
}
function createMarkupList(data) {
  const markup = listCountries(data);
  containerCard.insertAdjacentHTML('beforeend', markup);
}
function clearContainer() {
  containerCard.innerHTML = '';
}