import React from 'react'
import Axis from '../Axis/Axis'
import d3_time from 'd3-time'
import {timeFormat} from 'd3-time-format'


export default ({ scales, margins, svgDimensions }) => {
    const { height,width } = svgDimensions

    const xProps = {
        orient: 'Bottom',
        scale: scales.xScale,
        translate: `translate(0, ${height - margins.bottom})`,
        tickSize: height - margins.top - margins.bottom,
        //tickFormat: timeFormat("%b")
    }

    const yProps = {
        orient: 'Left',
        scale: scales.yScale,
        translate: `translate(${margins.left}, 0)`,
        tickValues: [600,500,400,300,200,100],
        tickSize: width - margins.left - margins.right,
    }

    return (
        <g>
            <Axis {...xProps} />
            <Axis {...yProps} />
        </g>
    )
}