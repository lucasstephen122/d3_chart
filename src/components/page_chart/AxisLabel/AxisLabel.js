import React, { Component } from 'react'
import './AxisLabel.css'

export default class AxisLabel extends Component {

    createLabels = () => {
        // alert(1)
        const { svgDimensions, xLabel, yLabel } = this.props
        let xLabels = []
        xLabel.forEach(function(label){
            xLabels.push(<text x={label.x} y={label.y}  className="y_label">{label.text}</text>)
        })
        console.log(xLabels)
        return xLabels
    }
    render() {
        const { svgDimensions, xLabel, yLabel } = this.props
        const { height, width } = svgDimensions 

        const Xlabel_x = width / 2
        const Xlabel_y = height
        console.log(xLabel)
        return (
            <g>
                {/* <text  y="120" x="120" dy="1em" className="y_label">{xLabel}</text> */}
                {/* <text  y="80" x="60" dy="1em" className="y_label">Tank</text>
                <text  y="100" x="42" dy="1em" className="y_label">Inventory</text>
                <text  y="120" x="46" dy="1em" className="y_label">(`000 M3)</text> */}
                {this.createLabels()}
                <text style={{ transform: `translateX(${Xlabel_x}px) translateY(${Xlabel_y}px)` }} x="20" y="-10" className="y_label">{yLabel}</text>
            </g>
        )
    }
}