import React, { Component } from 'react'
import './Legend.css'

export default class Legend extends Component {

    render() {
        return (
            <g className="legend" transform="translate(30,30)">
                <text x="0" y="0" className="legend-title">Legend</text>
                <line x1="50" y1="-12" x2="50" y2="8" className="legend-split"></line>
                <rect x="60" y="-10" width="12" height="12" rx="1" ry="1" stroke="#009e8e" strokeWidth="1" fill="#009e8e"></rect>
                <text x="80" y="0" className="legend-sub">Actual</text>
            </g>
        )
    }
}