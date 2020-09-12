const URL_PREFIX = 'https://api.exchangeratesapi.io/';
const $ratesBody = document.querySelector('#ratesBody');
const $update = document.querySelector('#update');

$update.onclick = updateRates;

getFxRates();
setDate();

function updateRates(){
    removeRates();
    const [base, date] = readBaseAndDate();
    getFxRates(base, date);
}

function getFxRates(base = 'EUR', date = 'latest'){
    const URL = `${URL_PREFIX}${date}?base=${base}`;
    fetch(URL)
        .then( response => response.json() )
        .then( response => {showRates(response);} )
        .catch( error => showAlert(error) );
}

function showRates(response){
    removeAlert();
    setBaseOptions(response);
    populateRatesBody(response.rates);
    updateRatesTitle(response.base, response.date)
}



function removeRates(){
    $ratesBody.innerHTML = '';
}

function showAlert(error){
    console.error('Fetch problem: ', error);

    const $ratesAlert = document.querySelector('#ratesAlert');
    $ratesAlert.textContent = error;
}

function removeAlert(){
    const $ratesAlert = document.querySelector('#ratesAlert');
    $ratesAlert.textContent = '';
}

function readBaseAndDate(){
    const base = document.querySelector('#base').value;
    const date = document.querySelector('#date').value;
    return [base, date];
}

function updateRatesTitle(base = 'EUR', date){
    const ratesTitle = `All currencies quoted against ${base} (base currency) on ${date}`;
    document.querySelector('#ratesTitle').textContent = ratesTitle;
}

function setBaseOptions(response){
    const currencies = Object.keys(response.rates).concat(response.base).sort();
    const $base = document.querySelector('#base');
    //currencies.sort();
    currencies.forEach(key => {
        optionNode = document.createElement('option');
        optionNode.setAttribute('value', key);
        optionNode.textContent = key;
        $base.appendChild(optionNode);        
    });
}

function createRateRow(currency, spot){
    const tableRow = document.createElement('tr');
    const tdCurrency = document.createElement('td');
    const tdSpot = document.createElement('td');
    
    tdCurrency.textContent = currency;
    tdSpot.textContent = spot;
    tableRow.appendChild(tdCurrency);
    tableRow.appendChild(tdSpot);
    
    $ratesBody.appendChild(tableRow);
}

function populateRatesBody(rates){
    let arrRates = Object.entries(rates);
    arrRates.sort( (a, b) => a[0].localeCompare(b[0]) );
    for (const [currency, spot] of arrRates) {
        createRateRow(currency, spot);
      }
}

function setDate(){
    const $date = document.querySelector('#date');
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // Enero empieza en 0
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = `0${dd}`;
    }
    if (mm < 10) {
        mm = `0${mm}`;
    }
    today = `${yyyy}-${mm}-${dd}`;

    $date.setAttribute('max', today);
    $date.setAttribute('value', today);
}