import React, { Component } from 'react'
import './AxisLabel.css'

export default class AxisLabel extends Component {

    createLabels = () => {
        // alert(1)
        const { svgDimensions, xLabel, yLabel } = this.props
        let yLabel_array = yLabel.split("  ");
        let yLabel_spans = []
        let index = 0
        yLabel_array.forEach(function(label){
            yLabel_spans.push(<tspan x="80" y="100" dy={index*20} key={Math.random()} className="y_label">{label}</tspan>)
            index += 1;
        })
        return yLabel_spans
    }
    render() {
        const { svgDimensions, xLabel, yLabel } = this.props
        const { height, width } = svgDimensions 

        const Xlabel_x = width / 2
        const Xlabel_y = height

        return (
            <g>
                {/* {this.createLabels()} */}
                {/* <text x="120" y="80" className="y_label">{yLabel}</text> */}
                <text x="70" y="100" className="y_label">
                    {this.createLabels()}
                </text>
                <text style={{ transform: `translateX(${Xlabel_x}px) translateY(${Xlabel_y}px)` }} x="20" y="-10" className="y_label">{xLabel}</text>
            </g>
        )
    }
}