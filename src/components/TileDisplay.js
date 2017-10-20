import React, { Component } from 'react';
import * as cryptoCompare from '../api_calls/crypto-compare';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';


export default class TileDisplay extends Component {
  constructor(props){
    super(props)
    this.state = {
      coin: this.props.coin,
      coinHist: []
    }

  }

  // componentWillReceiveProps(nextProps){
    // console.log(nextProps.coin.symbol);
    // this.setState({coin: this.props.coin});
    // console.log(nextProps.symbol);
    // this.retrieveHistoricPrice(nextProps.coin.symbol, 'USD', 'day', 30)
  // }

  componentDidMount(){
    this.retrieveHistoricPrice(this.props.coin.symbol, 'USD', 'hour', 480);
    
  }

  retrieveHistoricPrice(fsym, tsym, period, limit){
    cryptoCompare.getHist(fsym, tsym, period, limit).then(result => this.setState({coinHist: result.Data}));
  }

  render(){
    const priceArray = this.state.coinHist.map(item => item.close);
    const priceChange = ((priceArray[priceArray.length - 1]/priceArray[0]) - 1) * 100
    

    return(
      <div className="tile-main">
        <div className="tile-left">
          <h1>{this.props.coin.name}:</h1>
          <p>{this.props.coin.symbol}/BTC</p>
          <p>{this.props.coin.price_btc} BTC</p>
          <p>{this.props.coin.price_usd} USD</p>
          <p>{parseInt(this.props.coin.market_cap_usd).toLocaleString()}</p>
          <p>{priceChange.toFixed(2)}%</p>
          <p></p>
          <p></p>
        </div>
        <div className="tile-right">        
          {priceArray.length > 0 ? 
          <div className="tile-chart">
            <Sparklines data={this.state.coinHist.map(item => item.close)} style={{background: "transparent"}} margin={0} height={180}>
              {priceChange > 0 ?
              <SparklinesLine style={{ stroke: "white", fill: "#00ff00", fillOpacity: '.4' }} />
              :
              <SparklinesLine style={{ stroke: "white", fill: "ff0000", fillOpacity: '.4' }} />
              }
              {/* <SparklinesSpots /> */}
            </Sparklines>
          </div>
          :
          <div className="no-data">No Data.</div>
          }
        </div>
      </div>
    )
  }
}