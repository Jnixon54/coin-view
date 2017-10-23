import React, { Component } from 'react';
import * as cryptoCompare from '../../api_calls/crypto-compare';
import Chart from '../StockChart/Chart';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import './ListDisplay.css'


export default class ListDisplay extends Component {
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
    this.retrieveHistoricPrice(this.props.coin.symbol, 'USD', 'hour', 24);
    
  }

  retrieveHistoricPrice(fsym, tsym, period, limit){
    cryptoCompare.getHist(fsym, tsym, period, limit).then(result => this.setState({coinHist: result.Data}));
  }

  render(){
    const priceArray = this.state.coinHist.map(item => item.close);
    const priceChange = ((priceArray[priceArray.length - 1]/priceArray[0]) - 1) * 100

    return(
      <div >
        {priceArray.length > 0 ? 
        <div className="list-row Grid" onClick={() => this.props.handleFocus(this.props.coin.symbol)}>
          <div className="Grid-cell col1">{this.props.coin.rank}</div>
          <div className="Grid-cell">{this.props.coin.symbol}</div>
          <div className="Grid-cell">{this.props.coin.name}</div>
          <div className="Grid-cell">${this.props.coin.price_usd}</div>
          <div className="Grid-cell">{this.props.coin.price_btc}</div>
          <div className="Grid-cell">{priceChange.toFixed(2)}%</div>
          <div className="chart Grid-cell colChart">
            {priceChange > 0 ?
            <Sparklines data={this.state.coinHist.map(item => item.close)} height={80}>
              <SparklinesLine style={{ stroke: "#8ed53f", strokeWidth: "2", fill: "none" }} />
            </Sparklines>:
            <Sparklines data={this.state.coinHist.map(item => item.close)} height={80}>
              <SparklinesLine style={{ stroke: "#d1192e", strokeWidth: "2", fill: "none" }} />
            </Sparklines>
            }
            {/* <Sparklines data={this.state.coinHist.map(item => item.close)} style={{background: "transparent"}} margin={0} height={80}>
              {priceChange > 0 ?
              <SparklinesLine style={{ stroke: "white", fill: "#00ff00", fillOpacity: '.4' }} />
              :
              <SparklinesLine style={{ stroke: "white", fill: "ff0000", fillOpacity: '.4' }} />
              }
            </Sparklines> */}
          </div>
          <Chart handleFocus={this.props.handleFocus}
                 isFocused={this.props.isFocused}/>
        </div>
        :
        <div className="no-data">No Data.</div>
        }
      </div>

    )
  }
}