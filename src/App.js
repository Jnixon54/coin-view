import React, { Component } from 'react';
import './App.css';
import GlobalDataDisplay from './components/GlobalDataDisplay/GlobalDataDisplay';
import ListCreator from './components/ListDisplay/ListCreator';
import Chart from './components/StockChart/Chart';

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
      topCoinsHist: [],
      isFocused: false,
      focusData: [],
      timeframe: 'day'


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
    this.retrieveTopCoins(4);
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

  handleFocus(coinHist){
    if (this.state.isFocused){
      this.setState({isFocused: false, focusData: coinHist});  
    } else {
      this.setState({isFocused: true, focusData: coinHist});
    }
    console.log(coinHist);
    // console.log(this.state.isFocused.toString() + this.state.focus.toString());
  }
  handleTimeframe(timeframe){
    this.setState({timeframe});
  }

  render() {
    let tags = ["test"];
    !this.state.isFocused && tags.push("hidden");

    return (
      <div className="App">
        <GlobalDataDisplay data={this.state.globalData} />
        <div className="button-nav">
          <button className="button" onClick={() => this.handleTimeframe('day')}>24 HR</button>
          <button className="button" onClick={() => this.handleTimeframe('week')}>7 Day</button>
          <button className="button" onClick={() => this.handleTimeframe('month')}>1 Month</button>
        </div>
        <ListCreator topCoins={this.state.topCoins}
                     isFocused={this.state.isFocused}
                     handleFocus={this.handleFocus}
                     timeframe={this.state.timeframe}/>
        <Chart handleFocus={this.handleFocus}
               isFocused={this.state.isFocused}
               focusData={this.state.focusData}
               tags={tags}/>
      </div>
    );
  }
}

export default App;

// blah > 0 && render this map for example. wont render if blah is not > 0