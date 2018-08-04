import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import {extent} from 'd3'
import { timeParse } from 'd3-time-format'
import Lines from './Line/Line'
import Bars from './Bar/Bar'
import Areas from './Area/Area'
import jQuery from 'jquery';
import Axes from './Axes/Axes'
import Axes1 from './Axes/Axes1'
import Tooltip from './Tooltip/Tooltip'
import Legend from './Legend/Legend'
import DotLine from './DotLine/DotLine'
import AxisLabel from './AxisLabel/AxisLabel'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
import { select as d3Select, clientPoint } from 'd3-selection'
import d3 from 'd3';
class Chart extends Component {
    constructor(props) {
        super(props)
        this.xScale = scaleTime()
        this.yScale = scaleLinear()
        this.yScale1 = scaleLinear()
        this.state = {
            xTooltip: null,
            yTooltip: null,
            t_opacity: null,
            containerwidth:jQuery(".Responsive-wrapper").width()
        }
        this.subscriber = this.subscriber.bind(this);
        let x_scale;
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
    mouseMove(e){
        var current_value = clientPoint(e.target, e)
        var current_xvalue = current_value[0]
        console.log(this.xScale.invert(current_xvalue))
        

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
        const margins = { top: 70, right: 50, bottom: 40, left: 150 }
        const svgDimensions = {
            // width: jQuery(".Responsive-wrapper").width(),
            width: this.props.parentWidth,
            height: 700
        }
        const svgSubDimentions1 = {
            width: this.props.parentWidth,
            height: 500
        }
        const svgSubDimentions2 = {
            width: this.props.parentWidth,
            height: 700
        }
        const maxValue = Math.max(...data.map(d => d.value3))
        const minValue = Math.min(...data.map(d => d.value3))
        var parseDate = timeParse("%Y-%m-%d");
        var new_data = []
        data.forEach(function(item){
            var d = item;
            d.parsed_date = parseDate(d.datetime);
            new_data.push(d)
        })
        const xScale = this.xScale
            .domain(extent(new_data, function (d) { return d.parsed_date; }))
            .range([margins.left, svgDimensions.width - margins.right])
        
        this.x_scale = xScale
        
        const yScale = this.yScale
            .domain([0, 800])
            .range([svgSubDimentions1.height - margins.bottom, margins.top])
        const yScale1 = this.yScale1
            .domain([-6, 2])
            .range([svgSubDimentions2.height-margins.bottom, svgSubDimentions1.height-margins.bottom])

        //tooltip circle
        var focus_container = <g className = "tooltip_circle_g"></g>
        const focus_circle = <circle className = "tooltip_circle y" r="4"></circle>
        return (
            <div>
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgSubDimentions1}
                    />
                    <Axes1
                        scales={{ xScale, yScale1 }}
                        margins={margins}
                        svgDimensions={svgSubDimentions2}
                    />
                    <Legend />
                    <DotLine 
                        y_value={580} 
                        text="Safety Ceiling" 
                        svgDimensions={svgSubDimentions1} 
                        scales = {{ xScale, yScale }} 
                        margins = {margins}
                    />
                    <DotLine 
                        y_value={150} 
                        text="Safety Floor" 
                        svgDimensions={svgSubDimentions1} 
                        scales = {{ xScale, yScale }} 
                        margins = {margins}
                    />
                    <Lines
                        scales={{ xScale, yScale }}
                        data={new_data}
                    />
                    <Areas
                        scales={{ xScale, yScale }}
                        data={new_data}
                    />
                    <rect 
                        className = "tooltip_rect"
                        key={Math.random()}
                        x={margins.left}
                        y={yScale(maxValue+20)}
                        height={120}
                        fill="#ffffff" 
                        fill-opacity="0"
                        width={svgDimensions.width- margins.right-margins.left}
                        // onMouseOver = {this.triggerOver.bind(this)}
                        onMouseMove = {this.mouseMove.bind(this)}
                    />
                    <Bars
                        svgDimensions={svgDimensions}
                        margins={margins}
                        scales={{ xScale, yScale1 }}
                        data={new_data}
                        type = {1}
                    />
                    <Bars
                        svgDimensions={svgDimensions}
                        margins={margins}
                        scales={{ xScale, yScale1 }}
                        data={new_data}
                        type = {2}
                    />
                    <AxisLabel 
                        svgDimensions={svgDimensions}
                        yLabel = {"Tank  Inventory  (`000 M3)"}
                        x_value = {130}
                        y_value = {100} 
                    />
                    <AxisLabel 
                        svgDimensions={svgDimensions}
                        yLabel = {"Production  and Offtake  (BCE)"}
                        x_value = {100}
                        y_value = {450} 
                    />
                </svg>
                <Tooltip {...this.state} />
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart)