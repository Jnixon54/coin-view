import React, { Component } from 'react';
import './App.css';
import GlobalDataDisplay from './components/GlobalDataDisplay/GlobalDataDisplay';
import TileDisplay from './components/TileDisplay/TileDisplay';
import ListDisplay from './components/ListDisplay/ListDisplay';

import * as coinMarketCap from './api_calls/coin-market-cap';
import * as cryptoCompare from './api_calls/crypto-compare';

import axios from 'axios';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      globalData: {},
      coinList: {},
      // coinListArray: [],
      // coinPriceList: [],
      topCoins: [],
      topCoinsSym: []


    }

    // this.retrieveGlobalData = this.retrieveGlobalData.bind(this);
    // this.retrieveHistoricPrice = this.retrieveHistoricPrice.bind(this);
    
  }

  componentWillMount(){
    axios.get('/api/test').then(response => console.log(response));
  }

  componentDidMount(){
    this.retrieveGlobalData();
    // this.retrieveCoinList();
    this.retrieveTopCoins(6);
    // this.retrieveMultiFull();
    
  }

  retrieveGlobalData(){
    coinMarketCap.getGlobalData().then(result => this.setState({globalData: result}));
  }

  // retrieveCoinList(){
  //   cryptoCompare.getCoinList().then(result => this.setState({coinListArray: Object.keys(result.Data), coinList: result.Data}))
  // }

  // Maybe add args
  // retrieveMultiFull(){
  //   cryptoCompare.getMultiFull(this.state.coinListArray, ['BTC', 'USD'])
  // }

  retrieveTopCoins(x){
    coinMarketCap.topLimit(x).then(result => this.setState({topCoins: result, topCoinsSym: result.map(obj => obj.symbol)}))
    
  }

  render() {
    return (
      <div className="App">
        <GlobalDataDisplay data={this.state.globalData} />
        <div className="table-container">
          <table>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Price USD</th>
            <th>Price BTC</th>
            <th>Market Cap</th>
            <th>% Change 24HR</th>
            <th>Chart</th>
          {
            this.state.topCoins.length > 0 ?
            this.state.topCoins.map( (item) => { 
              return <ListDisplay coin={item} />;
            }):
            <p>No items found.</p>
          }
          </table>
        </div>
      </div>
    );
  }
}

export default App;

// blah > 0 && render this map for example. wont render if blah is not > 0