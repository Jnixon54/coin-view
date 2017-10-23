import React, { Component } from 'react';
import * as cryptoCompare from '../../api_calls/crypto-compare';
import ListDisplay from './ListDisplay';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import './ListCreator.css';

export default class ListCreator extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    let tags = ["list-main"];
    this.props.isFocused && tags.push("hidden");

    return(
      <div className={tags.join(' ')}>  
        <div className="list-header list-row Grid"> 
          <div className="Grid-cell col1" id="rank">Rank</div>
          <div className="Grid-cell">Symbol</div>
          <div className="Grid-cell">Name</div>
          <div className="Grid-cell">USD Price</div>
          <div className="Grid-cell">BTC Price</div>
          <div className="Grid-cell">%Change</div>
          <div className="Grid-cell colChart">Chart</div>
        </div>
          {
          this.props.topCoins.length > 0 ?
          this.props.topCoins.map( (item) => { 
            return <ListDisplay coin={item} 
                                isFocused={this.props.isFocused} 
                                swipeLeft={this.props.handleFocus}/>;
          }):
          <p className="list-row">No items found.</p>
          }
      </div>
    )
  }
}