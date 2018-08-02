import React, { Component } from 'react'
import * as d3 from 'd3-shape'

export default class Area extends Component {

    render() {
        const { scales, data, margins, svgDimensions } = this.props
        const { xScale, yScale } = scales
        const { height } = svgDimensions 

        const line = d3.area()
            // .x(function (d) { return xScale(d.x); })
            // .y1(function (d) { return yScale(d.y); })
            // .y0(height - margins.bottom)

        const newline = line(data)

        return (
            <path className="line" fill="url(#diagonal-stripe-2)" d={newline}></path>
            
        );
    }
}