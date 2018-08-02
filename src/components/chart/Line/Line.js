import React, { Component } from 'react'
import * as d3 from 'd3-shape'

export default class Line extends Component {

    render() {
        const { scales, data, type } = this.props
        const { xScale, yScale } = scales

        const line_color = type == 1 ? '#e0b25c' : '#58478d';
        const line = d3.line()
            .x(function (d) { return xScale(d.x); })
            .y(function (d) { return yScale(d.y); })

        const newline = line(data);

        return (
            <path className="line" fill="none" stroke={line_color} strokeWidth="3px" d={newline}></path>
        )
    }
}