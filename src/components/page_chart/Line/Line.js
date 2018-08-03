import React, { Component } from 'react'
import * as d3 from 'd3-shape'

export default class Line extends Component {

    render() {
        const { scales, data } = this.props
        const { xScale, yScale } = scales

        const line_color = '#58478d' ;
        const line = d3.line()
            .x(function (d) { return xScale(d.parsed_date); })
            .y(function (d) { return yScale(d.value3); })

        const newline = line(data);

        return (
            <path className="line" fill="none" stroke={line_color} strokeWidth="2px" d={newline}></path>
        )
    }
}