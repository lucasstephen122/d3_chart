import React, { Component } from 'react'
import './Legend.css'
export default class Legend extends Component {

    render() {
        return (
            <g className="legend" transform="translate(50,30)">
                <text x="0" y="0" className="legend-title">Legend</text>
                <rect x="100" y="-8" width="13" height="6" rx="3" ry="3" stroke="#1c2c73" strokeWidth="1" fill="#1c2c73"></rect>
                <text x="125" y="-1" className="legend-sub" stroke="#999999" strokeWidth="1">Actual</text>
                <rect x="200" y="-8" width="13" height="6" rx="3" ry="3" stroke="#c9cdde" strokeWidth="1" fill="#c9cdde"></rect>
                <text x="225" y="-1" className="legend-sub" stroke="#999999" strokeWidth="1">Planned</text>
            </g>
        )
    }
}