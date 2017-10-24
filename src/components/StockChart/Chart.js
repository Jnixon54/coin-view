import React, { Component } from 'react';
// import * as cryptoCompare from '../../api_calls/crypto-compare';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import './Chart.css';

export default class Chart extends Component {
  constructor(props){
    super(props)
    this.state = {
      focusData: []
    }
  }

  componentWillReceiveProps(newProps){
    // console.log(nextProps.focusData);
    this.setState({focusData: newProps.focusData})

  }

  render(){
    // console.log(this.state.focusData)
    let tags = ["test"];
    !this.props.isFocused && tags.push("hidden");
    console.log(this.state.focusData);
    return(
      <div>
        <div className={this.props.tags.join(' ')}>
          <div className="big-chart">
          <Sparklines data={this.state.focusData.map(item => item.close)} height={125} margin={0}>
            <SparklinesLine color="#60887b" />
          </Sparklines>
          </div>
        </div>
        
      </div>
    )
  }
}