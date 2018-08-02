import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'

import Axes from './Axes/Axes'
import Lines from './Line/Line'
import Tooltip from './Tooltip/Tooltip'
import ScatterPlot from './ScatterPlot/ScatterPlot'
import AxisLabel from './AxisLabel/AxisLabel'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'

class EmulationChart extends Component {
    constructor(props) {
       super(props)
       this.xScale = scaleLinear()
       this.yScale = scaleLinear()
       this.state = {
           xTooltip: null,
           yTooltip: null,
           t_opacity: null
       }
    }
    mouseOut(e, d) {
        this.setState({
            xTooltip: null,
            yTooltip: null,
            t_opacity: null
        })
    }

    mouseOver(e, d) {
        this.setState({
            xTooltip: e.pageX,
            yTooltip: e.pageY,
            t_opacity: 1
        })
    }

    render() {
        const margins = { top: 70, right: 50, bottom: 40, left: 80 }
        const svgDimensions = {
            width: Math.min(this.props.parentWidth, 500),
            height: 500
        }

        /* const maxValue = Math.max(...this.props.areaData.map(d => d.y)) */

        const xScale = this.xScale
            .domain([-600, 600])
            .range([margins.left, svgDimensions.width - margins.right])

        const yScale = this.yScale
            .domain([1400, 0])
            .range([svgDimensions.height - margins.bottom, margins.top])

        return (
            <div>
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <defs>
                        <pattern id="diagonal-stripe-3" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-60)">
                            <rect width="1" height="4" transform="translate(0,0)" fill="#aaaaaa"></rect>
                        </pattern>
                    </defs>
                    <defs>
                        <rect id="b" width="28" height="28" rx="6" />
                        <filter id="a" width="121.4%" height="121.4%" x="-10.7%" y="-10.7%" filterUnits="objectBoundingBox">
                            <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
                            <feMorphology in="SourceAlpha" radius="1" result="shadowInner" />
                            <feOffset in="shadowInner" result="shadowInner" />
                            <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1" />
                            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1" />
                            <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 1 0" />
                        </filter>
                    </defs>
                
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />
                    <ScatterPlot
                        scales={{ xScale, yScale }}
                        margins={margins}
                        type={this.props.type}
                        data={this.props.areaData}
                    />
                    <AxisLabel
                        svgDimensions={svgDimensions}
                        xLabel={'predicted emulsion'}
                        yLabel={'injection dosage'}
                    />
                </svg>
                    <Tooltip {...this.state}/>
            </div>
        )
    }
}

export default ResponsiveWrapper(EmulationChart)