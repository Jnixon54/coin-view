import React, { Component } from 'react';
// import * as cryptoCompare from '../../api_calls/crypto-compare';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import './Chart.css';

export default class Chart extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  render(){
    let tags = ["test"];
    !this.props.isFocused && tags.push("hidden");
    
    return(
      <div>
        <div className={tags.join(' ')}>sadasdasd
            <button className="return" onClick={() => this.props.handleFocus(null)}>Switch</button>
        </div>
      </div>
    )
  }
}