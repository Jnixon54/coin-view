import React, { Component } from 'react';
import * as cryptoCompare from '../../api_calls/crypto-compare';
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
    this.retrieveHistoricPrice(this.props.coin.symbol, 'USD', 'hour', 24);
    
  }

  retrieveHistoricPrice(fsym, tsym, period, limit){
    cryptoCompare.getHist(fsym, tsym, period, limit).then(result => this.setState({coinHist: result.Data}));
  }

  render(){
    const priceArray = this.state.coinHist.map(item => item.close);
    const priceChange = ((priceArray[priceArray.length - 1]/priceArray[0]) - 1) * 100
    

    return(
     
        <tr>
          <td>#{this.props.coin.rank}</td>
          <td>{this.props.coin.symbol}</td>
          <td>{this.props.coin.name}</td>
          <td>{this.props.coin.price_usd}</td>
          <td>{this.props.coin.price_btc}</td>
          <td>{this.props.coin.market_cap_usd}</td>
          <td>{priceChange.toFixed(2)}</td>
          <td className="chart-container">   
            {priceArray.length > 0 ? 
            <div className="chart">
              <Sparklines data={this.state.coinHist.map(item => item.close)} style={{background: "transparent"}} margin={0} height={50}>
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
          </td>
        </tr>

    )
  }
}