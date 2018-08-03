import React, { Component } from 'react'
import { scaleBand , scaleLinear, scaleTime } from 'd3-scale'
import {extent} from 'd3'
import {format} from 'd3-time'
import { timeFormat, timeParse } from 'd3-time-format'
import Lines from './Line/Line'
import Bars from './Bar/Bar'
import Areas from './Area/Area'
import jQuery from 'jquery';
import Axes from './Axes/Axes'
import Axes1 from './Axes/Axes1'
import Legend from './Legend/Legend'
import DotLine from './DotLine/DotLine'
import AxisLabel from './AxisLabel/AxisLabel'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
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
        const margins = { top: 70, right: 50, bottom: 40, left: 150 }
        const svgDimensions = {
            // width: jQuery(".Responsive-wrapper").width(),
            width: this.props.parentWidth,
            height: 1000
        }
        const svgSubDimentions1 = {
            width: this.props.parentWidth,
            height: 500
        }
        const svgSubDimentions2 = {
            width: this.props.parentWidth,
            height: 700
        }
        //const maxValue = Math.max(...data.map(d => d.value1))
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
        const yScale = this.yScale
            .domain([0, 800])
            .range([svgSubDimentions1.height - margins.bottom, margins.top])
        const yScale1 = this.yScale1
            .domain([-6, 2])
            .range([svgSubDimentions2.height-margins.bottom, svgSubDimentions1.height-margins.bottom])
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
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart)