import React from 'react'
import Axis from '../Axis/Axis'


export default ({ tick_values,scales, margins, svgDimensions }) => {
    const { height,width } = svgDimensions

    const xProps = {
        orient: 'Bottom',
        scale: scales.xScale,
        translate: `translate(0, ${height - margins.bottom})`,
        tickSize: height - margins.top - margins.bottom,
    }

    const yProps = {
        orient: 'Left',
        scale: scales.yScale,
        translate: `translate(${margins.left}, 0)`,
        tickValues: tick_values,
        tickSize: width - margins.left - margins.right,
    }

    return (
        <g>
            <Axis type="1" {...xProps} />
            <Axis {...yProps} />
        </g>
    )
}