import React, { Component } from 'react'

export default class ScatterPlot extends Component {

    render() {
        const { scales, data } = this.props
        const { xScale, yScale } = scales
        const dot_color = '#dddddd'

        // .x(function (d) { return xScale(d.x); })
        // .y1(function (d) { return yScale(d.y); })
        // .y0(height - margins.bottom)

        const dots = (
            data.map(datum =>
                <circle
                    key={Math.random()}
                    r={[5]}
                    stroke={dot_color}
                    cx={xScale(datum.x)}
                    cy={yScale(datum.y)}
                />
            )
        )

        return (
            <g> {dots}</g>
        );
    }
}