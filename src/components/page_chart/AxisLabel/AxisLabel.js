import React, { Component } from 'react'
import './AxisLabel.css'

export default class AxisLabel extends Component {

    createLabels = () => {
        // alert(1)
        const { svgDimensions, xLabel, yLabel } = this.props
        let yLabels = []
        yLabel.forEach(function(label){
            yLabels.push(<text x={label.x} y={label.y} key={Math.random()} className="y_label">{label.text}</text>)
        })
        return yLabels
    }
    render() {
        const { svgDimensions, xLabel, yLabel } = this.props
        const { height, width } = svgDimensions 

        const Xlabel_x = width / 2
        const Xlabel_y = height

        return (
            <g>
                {this.createLabels()}
                <text style={{ transform: `translateX(${Xlabel_x}px) translateY(${Xlabel_y}px)` }} x="20" y="-10" className="y_label">{xLabel}</text>
            </g>
        )
    }
}