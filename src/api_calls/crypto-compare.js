import axios from 'axios';

const base_url = "https://www.cryptocompare.com/api/data";

export const getCoinList = () => {
  return axios.get(`${base_url}/coinlist/`).then(response => response.data)
}

export const getMultiFull = (fromArr, toArr) => {
  console.log(`${base_url}/pricemultifull?fsyms=${fromArr.join(',')}&tsyms=${toArr.join(',')}`)
}

export const getHist = (fsym, tsym, period, limit) => { // limit default/max (minute: 1440/2000, hour: 168/2000, day: 30/2000)
  return axios.get(`https://min-api.cryptocompare.com/data/histo${period}?fsym=${fsym}&tsym=${tsym}&limit=${limit}&aggregate=3&e=CCCAGG`)
    .then(response => response.data)
}