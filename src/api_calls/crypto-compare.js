import axios from 'axios';

export const getCoinList = () => {
  return axios.get(`/api/coinlist`).then(response => response.data)
}

// export const getMultiFull = (fromArr, toArr) => {
//   console.log(`${base_url}/pricemultifull?fsyms=${fromArr.join(',')}&tsyms=${toArr.join(',')}`)
// }

export const getHist = (fsym, tsym, period, limit) => { // limit default/max (minute: 1440/2000, hour: 168/2000, day: 30/2000)
  return axios.get(`/api/histo?period=${period}&fsym=${fsym}&tsym=${tsym}&limit=${limit}`)
    .then(response => response.data)
}