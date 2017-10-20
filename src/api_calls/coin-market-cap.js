import axios from 'axios';

const base_url = "https://api.coinmarketcap.com/v1";

export const getGlobalData = () => {
  // return axios.get(`${base_url}/global/`).then(promise => promise.json());
  return axios.get(`${base_url}/global/`).then(response => response.data);
}

export const topLimit = (x) => {
  return axios.get(`${base_url}/ticker/?limit=${x}`).then(response => response.data);
}

// export const getCoinList = () => {
//   return axios.get(`${base_url}/`)
// }

