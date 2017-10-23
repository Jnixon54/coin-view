import React, { Component } from 'react';
import './App.css';
import GlobalDataDisplay from './components/GlobalDataDisplay/GlobalDataDisplay';
import TileDisplay from './components/TileDisplay/TileDisplay';
import ListCreator from './components/ListDisplay/ListCreator';

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
      topCoinsSym: [],
      isFocused: false,
      focus: ''


    }
    this.handleFocus = this.handleFocus.bind(this);
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

  handleFocus(coin){
    this.setState({isFocused: true, focus: coin});
    console.log(coin);
  }

  render() {
    return (
      <div className="App">
        <GlobalDataDisplay data={this.state.globalData} />
        <ListCreator topCoins={this.state.topCoins}
                     isFocused={this.state.isFocused}
                     handleFocus={this.handleFocus}/>
      </div>
    );
  }
}

export default App;

// blah > 0 && render this map for example. wont render if blah is not > 0