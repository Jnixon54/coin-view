import React, { Component } from 'react';

export default class GlobalDataDisplay extends Component {
  constructor(props){
    super(props)

    this.state = {
      total_market_cap_usd: '',
      total_24h_volume_usd: '',
      bitcoin_pct: ''
    }
  }
  
  componentWillReceiveProps(nextProps){
    // console.log(nextProps)
    this.setState({total_market_cap_usd: nextProps.data.total_market_cap_usd,
                   total_24h_volume_usd: nextProps.data.total_24h_volume_usd,
                   bitcoin_pct: nextProps.data.bitcoin_percentage_of_market_cap
                  });
  }

  render(){

    // const { total_market_cap_usd } = this.props.data;
    // console.log(this.state.bitcoin_pct);
    return(
    <div className="header">
      <div className="header-logo">
        <img src=".bitcoin-symbol.png"></img>
      </div>
      <div className="header-stats">
        <div className="header-item">
          <a>Total Market Cap: ${parseInt(this.state.total_market_cap_usd, 10).toLocaleString()}</a>
        </div>
        <div className="header-item">
          <a>Total Daily Volume: ${parseInt(this.state.total_24h_volume_usd, 10).toLocaleString()}</a>
        </div>
        <div className="header-item">
          <a>Bitcoin Market Share: {this.state.bitcoin_pct}%</a>
        </div>
      </div>
    </div>
    )
  }
}