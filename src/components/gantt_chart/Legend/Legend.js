import React, { Component } from 'react'
import './Legend.css'
export default class Legend extends Component {
    onClick1(e){
        this.props.onLegendClick(e,1)
    }
    onClick2(e){
        this.props.onLegendClick(e,2)
    }
    render() {
        return (
            <g className="legend" transform="translate(50,30)">
                <text x="0" y="0" className="legend-title">Legend</text>
                <rect x="100" y="-8" width="13" height="6" rx="3" ry="3" stroke="#1c2c73" strokeWidth="1" fill="#1c2c73" onClick={this.onClick1.bind(this)}></rect>
                <text x="125" y="-1" className="legend-sub" stroke="#999999" strokeWidth="1" onClick={this.onClick1.bind(this)}>Actual</text>
                <rect x="200" y="-8" width="13" height="6" rx="3" ry="3" stroke="#c9cdde" strokeWidth="1" fill="#c9cdde" onClick={this.onClick2.bind(this)}></rect>
                <text x="225" y="-1" className="legend-sub" stroke="#999999" strokeWidth="1" onClick={this.onClick2.bind(this)}>Planned</text>
            </g>
        )
    }
}