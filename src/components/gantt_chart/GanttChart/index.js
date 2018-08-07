import React, {Component} from 'react';
import {scaleBand, scaleTime} from 'd3-scale';
import {interpolateLab} from 'd3-interpolate';
import {extent as d3extent} from 'd3-array';
import throttle from 'lodash.throttle';
import {timeDay} from 'd3-time';
import { bisector} from 'd3'
import Axes from '../Axes';
import StackedBarHorizontal from '../StackedBar/horizontal';
import TimeSlider from '../TimeSlider/slider';
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper';
import Legend from '../Legend/Legend'
import * as moment from 'moment'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';
import {event as currentEvent} from 'd3';
import { clientPoint } from 'd3-selection'
import Tooltip from '../Tooltip/Tooltip'
import jQuery from 'jquery';
const defaultPaddingMultiplier = 0;
const DEFAULT_FILL_OPACITY = 1;
const slider_x = 80;
const slider_y = 90
class Chart extends Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.toggle = this.toggle.bind(this);
        this.xScale = scaleTime()
        this.yScale = scaleBand()
        this.bisectDate = bisector(function (d) { return d.datetime; }).left;
        this.state = {
            dropdownOpen1: false,
            chart_display : true,
            tooltip_x:100,
            tooltip_y:100,
            tooltip_date:"0000-00-00",
            tooltip_value:{},
            tooltip_display:false,
            chart_display_1:true,
            chart_display_2:true
        };
        this.chart_data = data
        this.filterData = this.filterData.bind(this)
      }
      
    toggle() {
    this.setState(prevState => ({
        dropdownOpen1: !prevState.dropdownOpen1
    }));
    }
    onClickLegend(event , type){
        if(type == 1){
            const state = this.state.chart_display_1
            this.setState({
                chart_display_1 : !this.state.chart_display_1
            })
            if(!state){
                jQuery(".status-1").fadeIn("slow")
            }else{
                jQuery(".status-1").fadeOut("slow")
            }
        }
        if(type == 2){
            const state = this.state.chart_display_2
            this.setState({
                chart_display_2 : !this.state.chart_display_2
            })
            if(!state){
                jQuery(".status-2").fadeIn("slow")
            }else{
                jQuery(".status-2").fadeOut("slow")
            }
        }
    }
    handleBarHover = this.props.handleBarHover ? this.props.handleBarHover.bind(null) : () => {};

    handleMouseMoveThrottled = throttle((item,current_value) => {
        const datum = JSON.parse(item);
        var is_tooltip = false
        if (datum && datum.title !== this.cacheBarHovered) {
            this.cacheBarHovered = datum.title;
            is_tooltip = true
        } else if (datum === null && this.cacheBarHovered !== null) {
            this.cacheBarHovered = datum;
            is_tooltip = false
            // this.handleBarHover(datum);
        }
        if(is_tooltip){
            this.setState({
                tooltip_value:datum,
                tooltip_display:true,
                tooltip_x:current_value[0],
                tooltip_y:current_value[1],
            })
        }else{
            this.setState({
                tooltip_display:false,
            })
        }
    }, 50);

    handleMouseMove = (event) => {
        var current_value = clientPoint(event.target, event)
        this.handleMouseMoveThrottled(event.target.getAttribute('data-datum'),current_value);
    };

    filterData(dstart,dend){
        dstart = dstart.subtract(1,'minute'); dend = dend.add(1,'minute');
        const { data } = this.props;
        var filter_data = data
        var new_data = []
        filter_data.forEach(function(data){
            var dd = {titleBar:data.titleBar,values:[]}
            data.values.forEach(function(item){
                if(moment(item.dateStart).isBetween(dstart,dend) && moment(item.dateEnd).isBetween(dstart,dend)){
                    dd.values.push(item)
                }
            })
            new_data.push(dd)
        })
        this.chart_data = new_data
        this.setState({
            chart_display : true
        })
    }
    render() {
        const {  axesProps, margins, stackColors, paddingMultiplier, fillOpacity } = this.props;
        const { legend, padding, tickFormat, ticksCount } = axesProps;
        const defaultMargins = { top: this.props.time_slider ? 150 : 80, right: 30, bottom: 80, left: 100 };
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 700,
        };
        const datePlainList = this.chart_data.reduce((array, item)=>{
            item.values.forEach((item) => {
                array.push(item.dateStart);
                array.push(item.dateEnd);
            });
            return array;
        }, []);

        const yDomain = this.chart_data.map((item) => (item.titleBar)).reverse();
        const datesDomain = d3extent(datePlainList, d => new Date(d));
        const AxesTicksCount = {
            xAxis: Math.min(
                Math.floor((datesDomain[1] - datesDomain[0]) / (1000 * 60 * 60 * 24)),
                (ticksCount && ticksCount.xAxis) || 30),
            yAxis: (ticksCount && ticksCount.yAxis) || this.chart_data.length,
        };

        const xScale = this.xScale
            .domain(datesDomain)
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right])
            // .nice(timeDay, 125);

        const yScale = this.yScale
            .padding(paddingMultiplier || defaultPaddingMultiplier)
            .domain(yDomain)
            .range([svgDimensions.height - canvasMargins.bottom, canvasMargins.top]);
        // const height = 14;
        const height = Math.max(0, yScale.bandwidth());
        return (
            <div className='svg_container'>
                <Dropdown group isOpen={this.state.dropdownOpen1} size="sm" className="filter-button" toggle={this.toggle}>
                      <DropdownToggle caret className="filter-dropdown">
                        Filter
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>filter1</DropdownItem>
                        <DropdownItem>filter</DropdownItem>
                      </DropdownMenu>
                </Dropdown>
                
                <svg
                    className = "chart_svg"
                    onMouseOver={this.handleMouseMove.bind(this)}
                    width={svgDimensions.width}
                    height={svgDimensions.height}>
                    <defs>
                        <filter id="f1" x="0" y="0" width="100%" height="100%">
                        <feOffset result="offOut" in="SourceGraphic" dx="0" dy="0" rx="10" ry="10"/>
                        <feColorMatrix result = "matrixOut" in = "offOut" type = "matrix" values = "0.5 0 0 0 0 0 0.5 0 0 0 0 0 0.5 0 0 0 0 0 1 0"/>
                        <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="5" />
                        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
                        </filter>
                        <filter id="ellipse_shadow" x="-40%" y="-40%" width="180%" height="180%" filterUnits="userSpaceOnUse" flood-color="#ff0000">
                            <feGaussianBlur in="matrixOut" stdDeviation="3"/>
                            <feColorMatrix result = "matrixOut" in = "offsetblur" type = "matrix" values = "0.0 0 0 0 0 0 0.8 0 0 0 0 0 0.5 0 0 0 0 0 0.8 0"/>
                            <feOffset dx="3" dy="3" result="offsetblur"/> 
                            <feOffset dx="-3" dy="-3" result="offsetblur"/>
                            <feMerge> 
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <rect 
                        className = "chart_mask"
                        x = {canvasMargins.left}
                        y = {canvasMargins.top}
                        width = {svgDimensions.width - canvasMargins.left - canvasMargins.right}
                        height = {svgDimensions.height - canvasMargins.bottom - canvasMargins.top} 
                        fill = "rgba(28, 44, 115, 0.04)"
                    />

                    <Legend 
                        onLegendClick = {this.onClickLegend.bind(this)}
                    />
                    <line 
                        stroke="#ccc" stroke-width="1" x1="0" y1="60" x2={svgDimensions.width} y2="60">
                    </line>
                    <TimeSlider
                        width = {svgDimensions.width-slider_x * 2}
                        start_x = {slider_x}
                        start_y = {slider_y}
                        filterData = {this.filterData.bind(this)}
                        xScale = {xScale}
                        display = {this.props.time_slider}
                    />
                    <line 
                        stroke="#ccc" stroke-width="1" x1="0" y1="150" x2={svgDimensions.width} y2="150" style={{ display : this.props.time_slider?"":"none"}}>
                    </line>
                    <Axes
                        scales={{xScale, yScale}}
                        padding={padding}
                        margins={canvasMargins}
                        ticksCount={AxesTicksCount}
                        tickFormat={tickFormat}
                        svgDimensions={svgDimensions}
                        legend={legend} />
                    {this.chart_data.map(datum => (
                        <StackedBarHorizontal
                            key={datum.titleBar}
                            scales={{xScale, yScale}}
                            y={yScale(datum.titleBar)}
                            isClickable={!!this.handleBarClick}
                            margins={canvasMargins}
                            height={height}
                            data={datum}
                            fillOpacity={fillOpacity || DEFAULT_FILL_OPACITY}
                            stackColors={stackColors}
                            svgDimensions={svgDimensions} />
                    ))}
                    
                </svg>
                <Tooltip 
                    {...this.state}
                    svgDimensions = {svgDimensions}
                    margins={margins}
                    scales={{ xScale, yScale }}
                />
            </div>
        );
    }
}

const responsiveWrapper = ResponsiveWrapper(Chart);
export default responsiveWrapper;
