import {
  removeRates,
  showAlert,
  removeAlert,
  readBase,
  readDate,
  updateRatesTitle,
  setBaseOptions,
  removeBaseOptions,
  populateRatesBody,
  setDate,
} from './ui.js';

function setUp() {
  const $update = document.querySelector('#update');
  $update.onclick = updateRates;

  getFxRates();
  setDate();
}

function updateRates() {
  removeRates();
  const base = readBase();
  const date = readDate();
  removeBaseOptions();
  getFxRates(base, date);
}

function getFxRates(base = 'EUR', date = 'latest') {
  const URL = `https://api.exchangerate.host/${date}?base=${base}`;
  fetch(URL)
    .then((response) => response.json())
    .then((response) => showRates(response))
    .catch((error) => showAlert(error));
}

function showRates(response) {
  removeAlert();
  setBaseOptions(response);
  populateRatesBody(response.rates);
  updateRatesTitle(response.base, response.date);
}

setUp();
