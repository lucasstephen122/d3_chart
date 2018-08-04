import React, { Component } from 'react'
import * as d3 from 'd3-shape'

export default class Area extends Component {

    render() {
        const { scales, data, margins } = this.props
        const { xScale, yScale } = scales
       
        const fill_color = 'rgba(88, 71, 141, 0.1)' ;
        const area = d3.area()
            .curve(d3.curveBasis)
            .x(function (d) { return xScale(d.parsed_date); })
            .y0(function (d) { return yScale(d.value2); })
            .y1(function (d) { return yScale(d.value1); })

        const newarea = area(data)

        return (
            <path className="line" fill={fill_color} d={newarea}></path>
            
        );
    }
}