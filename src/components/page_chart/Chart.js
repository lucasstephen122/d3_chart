import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import {extent} from 'd3'
import {format} from 'd3-time'
import { timeFormat } from 'd3-time-format'
import jQuery from 'jquery';
import Axes from './Axes/Axes'
import Legend from './Legend/Legend'
import AxisLabel from './AxisLabel/AxisLabel'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
class Chart extends Component {
    constructor(props) {
        super(props)
        this.xScale = scaleTime()
        this.yScale = scaleLinear()
        this.state = {
            xTooltip: null,
            yTooltip: null,
            t_opacity: null,
            containerwidth:jQuery(".Responsive-wrapper").width()
        }
        this.subscriber = this.subscriber.bind(this);
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

    subscriber(msg, data) {
        this.setState({
            containerwidth: jQuery(".Responsive-wrapper").width()
        });
        
     }

    render() {
        const data = this.props.data
        const margins = { top: 70, right: 50, bottom: 40, left: 100 }
        const svgDimensions = {
            // width: jQuery(".Responsive-wrapper").width(),
            width: this.props.parentWidth,
            height: 500
        }
        var parseDate = timeFormat("%b-%d").parse;
        var x = function (d) {
            return timeFormat("%b-%d", d.datetime)
        }
        //const maxValue = Math.max(...data.map(d => d.value1))
        const xScale = this.xScale
            .domain(extent(data, function (d) { return x(d); }))
            .range([margins.left, svgDimensions.width - margins.right])
        const yScale = this.yScale
            .domain([0, 800])
            .range([svgDimensions.height - margins.bottom, margins.top])
        return (
            <div>
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />
                    <Legend />
                    <AxisLabel 
                        svgDimensions={svgDimensions}
                        // yLabel={yLabels}
                        yLabel = {"Tank  Inventory  (`000 M3)"}
                    />
                </svg>
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart)