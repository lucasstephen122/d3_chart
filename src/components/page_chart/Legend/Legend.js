import React, { Component } from 'react'
import './Legend.css'

export default class Legend extends Component {

    render() {
        return (
            <g className="legend" transform="translate(50,30)">
                <text x="0" y="0" className="legend-title">Legend</text>
                <rect x="80" y="-8" width="16" height="8" rx="1" ry="1" stroke="#009e8e" strokeWidth="1" fill="#009e8e"></rect>
                <text x="120" y="1" className="legend-sub" stroke="#999999" strokeWidth="1">LNG Production Forecast</text>
                <rect x="300" y="-8" width="16" height="8" rx="1" ry="1" stroke="#1c2c73" strokeWidth="1" fill="#1c2c73"></rect>
                <text x="340" y="1" className="legend-sub" stroke="#999999" strokeWidth="1">LNG offtake Forecast</text>
                <rect x="480" y="-4" width="16" height="4" rx="1" ry="1" stroke="#58478d" strokeWidth="1" fill="#58478d"></rect>
                <text x="520" y="1" className="legend-sub" stroke="#999999" strokeWidth="1">LNG offtake Forecast</text>
                <circle r="5" cx="680" cy="-1" stroke="rgba(88, 71, 141, 0.1)" strokeWidth="1" fill="rgba(88, 71, 141, 0.1)"></circle>
                <text x="700" y="1" className="legend-sub" stroke="#999999" strokeWidth="1">Forecast Range</text>
            </g>
        )
    }
}