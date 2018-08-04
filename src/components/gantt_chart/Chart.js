import React, { Component } from 'react'
import { scaleLinear, scaleTime } from 'd3-scale'
import { extent, bisector} from 'd3'
import { timeParse } from 'd3-time-format'
import jQuery from 'jquery';
import Axes from './Axes/Axes'
import Axes1 from './Axes/Axes1'
import Tooltip from './Tooltip/Tooltip'
import Legend from './Legend/Legend'
import * as moment from 'moment'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
import { select as d3Select, clientPoint } from 'd3-selection'
import d3 from 'd3';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';
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
        this.toggle = this.toggle.bind(this);
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
            tooltip_date : d.datetime,
            tooltip_value : d.value3,
            tooltip_circle_x : this.xScale(parseDate(d.datetime)),
            tooltip_circle_y : this.yScale(d.value3),
            tooltip_display : true,
            dropdownOpen: false
        })
    }
    subscriber(msg, data) {
        this.setState({
            containerwidth: jQuery(".Responsive-wrapper").width()
        });
    }
    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    render() {
        const data = this.props.data
        const margins = { top: 70, right: 50, bottom: 40, left: 100 }
        const svgDimensions = {
            // width: jQuery(".Responsive-wrapper").width(),
            width: this.props.parentWidth,
            height: 500
        }

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
        
        const yScale = this.yScale
            .domain([0, 800])
            .range([svgDimensions.height - margins.bottom, margins.top])
        return (
            <div class='svg_container'>
                <Dropdown group isOpen={this.state.dropdownOpen} size="sm" className="pull-right filter-button" toggle={this.toggle}>
                    <DropdownToggle caret className="filter-dropdown">
                        Filter
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>filter1</DropdownItem>
                        <DropdownItem>filter2</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <svg width={svgDimensions.width} height={svgDimensions.height} className="chart_svg">
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
                        svgDimensions={svgDimensions}
                    />
                    <Legend />
                    {/* <Tooltip 
                        {...this.state}
                        svgDimensions = {svgDimensions}
                        margins={margins}
                        scales={{ xScale, yScale }}
                    /> */}
                </svg>
                
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart)