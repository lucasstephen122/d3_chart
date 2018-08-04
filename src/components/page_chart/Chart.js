import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { extent, bisector} from 'd3'
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
import * as moment from 'moment'
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
            tooltip_display:false
        }
        this.subscriber = this.subscriber.bind(this);
        
    }
    componentDidMount () {
        // var tooltip_rect = document.getElementById("tooltip_rect")
        // tooltip_rect.addEventListener("mouseout", function( event ) {   
        //     this.mouseOut(event);
        // });
        // tooltip_rect.addEventListener("mousemove", function( event ) {   
        //     console.log('event', event);
            
        // });
    }
    mouseOut(e) {
        this.setState({
            tooltip_display : false
        })
    }

    mouseOver(e) {
        this.tooltip_event(e)
    }

    mouseMove(e){
        this.tooltip_event(e)
    }
    tooltip_event(e){
        var current_value = clientPoint(e.target, e)
        var current_xvalue = current_value[0]
        var current_yvalue = current_value[1]
        
        var x0 = this.xScale.invert(current_xvalue);
        var y0 = this.yScale.invert(current_yvalue);
        console.log(y0)
        var cursor_date = moment(x0).format("YYYY-MM-DD")
        var i = this.bisectDate(this.data, cursor_date, 1)
        // var d0 = this.data[i-1]
        var d = this.data[i]
        // var d = x0 - d0.date > d1.date - x0 ? d1 : d0
        var parseDate = timeParse("%Y-%m-%d");

        this.setState({
            // xTooltip: e.pageX,
            // yTooltip: e.pageY,
            // t_opacity: 1,
            tooltip_date : d.datetime,
            tooltip_value : d.value3,
            tooltip_circle_x : this.xScale(parseDate(d.datetime)),
            tooltip_circle_y : this.yScale(d.value3),
            tooltip_display : true
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
                        id = "tooltip_rect"
                        className = "tooltip_rect"
                        key={Math.random()}
                        x={margins.left}
                        y={yScale(maxValue+20)}
                        height={maxValue - minValue}
                        fill="#ffffff" 
                        fillOpacity="0"
                        onMouseOut = {this.mouseOut.bind(this)}
                        width={svgDimensions.width- margins.right-margins.left}
                        onMouseMove = {this.mouseOver.bind(this)}
                        
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