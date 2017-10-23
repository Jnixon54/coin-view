const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const port = 3000;

const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.use(express.static(`${__dirname}/public/build`));

const cmc_url = "https://api.coinmarketcap.com/v1";
const cc_url = "https://www.cryptocompare.com/api/data";

// Coin Market Cap Calls
// Global Data
app.get('/api/global', (req, res, next) => {
  axios.get(`${cmc_url}/global/`).then(response => {
    console.log(`Succesfully retrieved global data from Coinmarketcap.com.`)
    res.json(response.data);
  }).catch(console.log);
})
// Top coins
app.get('/api/topcoins/:x', (req, res, next) => {
  axios.get(`${cmc_url}/ticker/?limit=${req.params.x}`).then(response => {
    console.log(`Succesfully retrieved top ${req.params.x} coins from Coinmarketcap.com.`)
    res.json(response.data);
  }).catch(console.log);
})


// Crypto Compare Calls
//
// app.get('/api/coinlist, (req, res, next) => {
//   axios.get(`${cc_url}/coinlist/`).then(response => res.json(response.data));
// }

// Historical
app.get('/api/histo', (req, res, next) => {
  let fsym = req.query.fsym;
  let tsym = req.query.tsym;
  let period = req.query.period;
  let limit = req.query.limit;

  axios.get(`https://min-api.cryptocompare.com/data/histo${period}?fsym=${fsym}&tsym=${tsym}&limit=${limit}&aggregate=3&e=CCCAGG`)
  .then(response => {
    console.log(`Succesfully retrieved historical ${period} data for ${fsym}/${tsym} for past ${limit} ${period}s.`);
    res.json(response.data);
  }).catch(console.log);
})
// app.get(, (req, res, next) => {
//   axios.get(`${cmc_url}/ticker/?limit=${x}`).then(response => response.data);
// }


app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});