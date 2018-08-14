import React from 'react'
import Axis from '../Axis/Axis'


export default ({tick_values, scales, margins, svgDimensions }) => {
    const { height,width } = svgDimensions

    const yProps = {
        orient: 'Left',
        scale: scales.yScale1,
        translate: `translate(${margins.left}, 0)`,
        // tickValues: tick_values,
        tickSize: width - margins.left - margins.right,
    }
    const xProps = {
        orient: 'Bottom',
        scale: scales.xScale,
        translate: `translate(0, ${height - margins.bottom})`,
        tickSize: height - margins.top - margins.bottom,
    }
    return (
        <g>
            <Axis {...yProps} />
            <Axis type="2" {...xProps} />
        </g>
    )
}