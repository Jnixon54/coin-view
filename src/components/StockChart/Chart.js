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
        <div className={this.props.tags.join(' ')}>
            <button className="return" onClick={() => this.props.handleFocus([])}>{"<<"}</button>
          <div className="big-chart">
          <Sparklines data={this.props.focusData.map(item => item.close)} height={125} margin={0}>
            <SparklinesLine color="#60887b" />
          </Sparklines>
          </div>
        </div>
        
      </div>
    )
  }
}