import React from 'react'
import Axis from '../Axis/Axis_Emulation'

export default ({ scales, margins, svgDimensions }) => {
    const { height } = svgDimensions

    const xProps = {
        orient: 'Bottom',
        scale: scales.xScale,
        translate: `translate(0, ${height - margins.bottom})`,
        tickValues: ['']
    }

    const yProps = {
        orient: 'Left',
        scale: scales.yScale,
        translate: `translate(${margins.left}, 0)`,
        tickValues: [0.42, 0.48, 0.52, 0.56]
    }

    return (
        <g>
            <Axis {...xProps} />
            <Axis {...yProps} />
        </g>
    )
}