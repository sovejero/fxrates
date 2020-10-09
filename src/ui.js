export function removeRates() {
  const $ratesBody = document.querySelector('#ratesBody');
  $ratesBody.innerHTML = '';
}

export function showAlert(error) {
  console.error('Fetch problem: ', error);

  const $ratesAlert = document.querySelector('#ratesAlert');
  $ratesAlert.textContent = error;
}

export function removeAlert() {
  const $ratesAlert = document.querySelector('#ratesAlert');
  $ratesAlert.textContent = '';
}

export function readBase() {
  return document.querySelector('#base').value;
}

export function readDate() {
  return document.querySelector('#date').value;
}

export function updateRatesTitle(base = 'EUR', date) {
  const ratesTitle = `All currencies quoted against ${base} (base currency) on ${date}`;
  document.querySelector('#ratesTitle').textContent = ratesTitle;
}

export function setBaseOptions(response) {
  const currencies = Object.keys(response.rates);
  const $base = document.querySelector('#base');
  if (response.base === 'EUR') {
    currencies.push(response.base);
  }
  currencies.sort();

  currencies.forEach((key) => {
    const optionNode = document.createElement('option');
    optionNode.setAttribute('value', key);
    optionNode.textContent = key;
    if (key === response.base) {
      optionNode.setAttribute('selected', '');
    }
    $base.appendChild(optionNode);
  });
}

export function removeBaseOptions() {
  const $base = document.querySelector('#base');
  $base.innerHTML = '';
}

export function createRateRow(currency, spot) {
  const tableRow = document.createElement('tr');
  const tdCurrency = document.createElement('td');
  const tdSpot = document.createElement('td');

  tdCurrency.textContent = currency;
  tdSpot.textContent = spot;
  tableRow.appendChild(tdCurrency);
  tableRow.appendChild(tdSpot);

  return tableRow;
}

export function populateRatesBody(rates) {
  const $ratesBody = document.querySelector('#ratesBody');
  const arrRates = Object.entries(rates);
  arrRates.sort((a, b) => a[0].localeCompare(b[0]));
  for (const [currency, spot] of arrRates) {
    const tableRow = createRateRow(currency, spot);
    $ratesBody.appendChild(tableRow);
  }
}

export function setDate() {
  const $date = document.querySelector('#date');
  const todayDate = new Date();
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(todayDate);
  const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(todayDate);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(todayDate);
  const today = `${year}-${month}-${day}`;
  // const today = dateToday.toISOString().slice(0, 10); UTC only

  $date.setAttribute('max', today);
  $date.setAttribute('value', today);
}
