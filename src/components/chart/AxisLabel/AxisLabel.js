import React, { Component } from 'react'
import './AxisLabel.css'

export default class AxisLabel extends Component {

    render() {
        const { svgDimensions, xLabel, yLabel } = this.props
        const { height, width } = svgDimensions 

        const Xlabel_x = width / 2
        const Xlabel_y = height

        return (
            <g>
                <text transform="rotate(-90)" y="20" x={-height/2} dy="1em" className="y_label">{xLabel}</text>
                <text style={{ transform: `translateX(${Xlabel_x}px) translateY(${Xlabel_y}px)` }} x="20" y="-10" className="y_label">{yLabel}</text>
            </g>
        )
    }
}