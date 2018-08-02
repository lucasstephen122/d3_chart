import React from 'react'
import Axis from '../Axis/Axis'

export default ({ scales, margins, svgDimensions }) => {
    const { height } = svgDimensions

    const xProps = {
        orient: 'Bottom',
        scale: scales.xScale,
        translate: `translate(0, ${height - margins.bottom})`,
        tickValues: [-600, -450, -300, -150, 0, 150, 300, 450, 600]
    }

    const yProps = {
        orient: 'Left',
        scale: scales.yScale,
        translate: `translate(${margins.left}, 0)`,
        tickValues: [0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350]
    }

    return (
        <g>
            <Axis {...xProps} />
            <Axis {...yProps} />
        </g>
    )
}