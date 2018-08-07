import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { extent, bisector} from 'd3'
import { timeParse } from 'd3-time-format'
import Lines from './Line/Line'
import animateWithEase from './Line/Animate';
import Bars from './Bar/Bar'
import Areas from './Area/Area'
import jQuery from 'jquery';
import Axes from './Axes/Axes'
import Axes1 from './Axes/Axes1'
import Tooltip from './Tooltip/Tooltip'
import Legend from './Legend/Legend'
import DotLine from './DotLine/DotLine'
import * as moment from 'moment'
import AxisLabel from './AxisLabel/AxisLabel'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
import { clientPoint } from 'd3-selection'
class Chart extends Component {
    constructor(props) {
        super(props)
        this.xScale = scaleTime()
        this.yScale = scaleLinear()
        this.yScale1 = scaleLinear()
        this.data = [];
        this.bisectDate = bisector(function (d) { return d.datetime; }).left;
        this.state = {
            xTooltip: null,
            yTooltip: null,
            t_opacity: null,
            containerwidth:jQuery(".Responsive-wrapper").width(),
            tooltip_circle_x:100,
            tooltip_circle_y:100,
            tooltip_date:"0000-00-00",
            tooltip_value:"",
            tooltip_display:false,
            tooltip_circle_display:true,
            chart_display_1:true,
            chart_display_2:true,
            chart_display_3:true,
            chart_display_4:true,
        }
        this.subscriber = this.subscriber.bind(this);
        
    }

    onClickLegend(event , type){
        if(type == 1){
            this.setState({
                chart_display_1 : !this.state.chart_display_1
            })
        }
        if(type == 2){
            this.setState({
                chart_display_2 : !this.state.chart_display_2
            })
        }
        if(type == 3){
            this.setState({
                chart_display_3 : !this.state.chart_display_3
            })
        }
        if(type == 4){
            this.setState({
                chart_display_4 : !this.state.chart_display_4
            })
        }
    }
    triggerOut(e) {
        this.setState({
            tooltip_display: false
        })
    }

    triggerOver(event,type) {
        var current_value = clientPoint(event.target, event)
        var current_xvalue = current_value[0]

        var x0 = this.xScale.invert(current_xvalue);

        var cursor_date = moment(x0).format("YYYY-MM-DD")
        var i = this.bisectDate(this.data, cursor_date, 1)
        var d = this.data[i]
        var parseDate = timeParse("%Y-%m-%d");
        var tooltip_value , tooltip_circle_y;
        if(type == 1){
            tooltip_value = d.value4
            tooltip_circle_y = this.yScale1(d.value4)-70
        }else if(type == 2){
            tooltip_value = d.value5
            tooltip_circle_y = this.yScale1(0)-70
        }
        this.setState({
            tooltip_date: d.datetime,
            tooltip_value: tooltip_value,
            tooltip_circle_x: this.xScale(parseDate(d.datetime)),
            tooltip_circle_y: tooltip_circle_y,
            tooltip_display: true,
            tooltip_circle_display:false
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
        var x1 
        const maxValue = Math.max(...data.map(d => d.value3))
        const minValue = Math.min(...data.map(d => d.value3))

        
        var parseDate = timeParse("%Y-%m-%d");
        var new_data = []
        data.forEach(function(item){
            var d = item;
            d.parsed_date = parseDate(d.datetime);
            new_data.push(d)
        })
        this.data = new_data;
        const xScale = this.xScale
            .domain(extent(new_data, function (d) { return d.parsed_date; }))
            .range([margins.left, svgDimensions.width - margins.right])
        
        //this.x_scale = xScale
        
        const yScale = this.yScale
            .domain([0, 800])
            .range([svgSubDimentions1.height - margins.bottom, margins.top])
        
        const yScale1 = this.yScale1
            .domain([-6, 2])
            .range([svgSubDimentions2.height-margins.bottom, svgSubDimentions1.height-margins.bottom])
        //tooltip circle
        return (
            <div>
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                <defs>
                    <filter id="f1" x="0" y="0" width="200%" height="200%">
                    <feOffset result="offOut" in="SourceGraphic" dx="2" dy="2" />
                    <feColorMatrix result = "matrixOut" in = "offOut" type = "matrix" values = "0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 1 0"/>
                    <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
                    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                    </filter>
                </defs>
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
                    <Legend 
                        onClick1 = {this.onClickLegend.bind(this)}
                    />
                    <line 
                        stroke="#ccc" stroke-width="1" x1="0" y1="70" x2={svgDimensions.width} y2="70">
                    </line>
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
                        display = {this.state.chart_display_3}
                    />
                    <Areas
                        scales={{ xScale, yScale }}
                        data={new_data}
                        display = {this.state.chart_display_4}
                    />
                    <rect 
                        id = "tooltip_rect"
                        className = "tooltip_rect"
                        key={Math.random()}
                        x={margins.left-50}
                        y={yScale(maxValue+100)}
                        height={maxValue - minValue+80}
                        fill="#000" 
                        fillOpacity="0"
                        pointerEvents = "all"
                        width={svgDimensions.width- margins.right-margins.left+100}
                        onMouseOver={(event) => {
                                this.setState({
                                    tooltip_display: false
                                })
                        }}
                    />
                    <rect 
                        id = "tooltip_rect"
                        className = "tooltip_rect"
                        key={Math.random()}
                        x={margins.left}
                        y={yScale(maxValue+30)}
                        height={maxValue - minValue}
                        fill="#000" 
                        fillOpacity="0"
                        pointerEvents = "all"
                        width={svgDimensions.width- margins.right-margins.left}
                        onMouseMove={(event) => {
                            var current_value = clientPoint(event.target, event)
                            var current_xvalue = current_value[0]

                            var x0 = this.xScale.invert(current_xvalue);
                            var cursor_date = moment(x0).format("YYYY-MM-DD")
                            if (this.x1 != cursor_date)
                            {
                                var cursor_date = moment(x0).format("YYYY-MM-DD")
                                var i = this.bisectDate(this.data, cursor_date, 1)
                                var d = this.data[i]
                                var parseDate = timeParse("%Y-%m-%d");

                                this.setState({
                                    tooltip_date: d.datetime,
                                    tooltip_value: d.value3,
                                    tooltip_circle_x: this.xScale(parseDate(d.datetime)),
                                    tooltip_circle_y: this.yScale(d.value3),
                                    tooltip_display: true,
                                    tooltip_circle_display:true
                                })

                                this.x1 = cursor_date
                            }
                        }}
                        onMouseOver={(event) => {
                            if(!this.state.tooltip_display)
                                this.setState({
                                    tooltip_display: true
                                })
                        }}
                    />
                    <Bars
                        svgDimensions={svgDimensions}
                        margins={margins}
                        scales={{ xScale, yScale1 }}
                        data={new_data}
                        type = {1}
                        onMouseOver={this.triggerOver.bind(this)}
                        onMouseOut={this.triggerOut.bind(this)}
                        display = {this.state.chart_display_1}
                    />
                    <Bars
                        svgDimensions={svgDimensions}
                        margins={margins}
                        scales={{ xScale, yScale1 }}
                        data={new_data}
                        type = {2}
                        onMouseOver={this.triggerOver.bind(this)}
                        onMouseOut={this.triggerOut.bind(this)}
                        display = {this.state.chart_display_2}
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
                    <Tooltip 
                        {...this.state}
                        svgDimensions = {svgDimensions}
                        margins={margins}
                        scales={{ xScale, yScale }}
                    />
                </svg>
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart)