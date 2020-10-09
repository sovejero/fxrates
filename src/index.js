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
    setDate
} from './ui.js';

function setUp(){
    const $update = document.querySelector('#update');
    $update.onclick = updateRates;

    getFxRates();
    setDate();
}

function updateRates(){
    removeRates();
    removeBaseOptions();
    getFxRates(readBase(), readDate());
}

function getFxRates(base = 'EUR', date = 'latest'){
    const URL = `https://api.exchangeratesapi.io/${date}?base=${base}`;
    fetch(URL)
        .then( response => response.json() )
        .then( response => showRates(response) )
        .catch( error => showAlert(error) );
}

function showRates(response){
    removeAlert();
    setBaseOptions(response);
    populateRatesBody(response.rates);
    updateRatesTitle(response.base, response.date)
}

setUp();
