import React, {Component} from 'react';
import {scaleBand, scaleTime} from 'd3-scale';
import {interpolateLab} from 'd3-interpolate';
import {extent as d3extent} from 'd3-array';
import throttle from 'lodash.throttle';
import {timeDay} from 'd3-time';

import Axes from '../Axes';
import StackedBarHorizontal from '../StackedBar/horizontal';
import TimeSlider from '../TimeSlider/slider';
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper';
import Legend from '../Legend/Legend'
import * as moment from 'moment'
// import BarDescription from '../Legends';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';
const defaultPaddingMultiplier = 0;
const DEFAULT_FILL_OPACITY = 1;
const slider_x = 80;
const slider_y = 90
class Chart extends Component {
    constructor(props) {
        super(props);
        const { data } = this.props;
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen1: false,
          chart_display : true
        };
        this.chart_data = data
        this.filterData = this.filterData.bind(this)
      }
      
      toggle() {
        this.setState(prevState => ({
          dropdownOpen1: !prevState.dropdownOpen1
        }));
      }
    handleBarHover = this.props.handleBarHover ? this.props.handleBarHover.bind(null) : () => {};

    handleMouseMoveThrottled = throttle((item) => {
        const datum = JSON.parse(item);

        if (datum && datum.title !== this.cacheBarHovered) {
            this.cacheBarHovered = datum.title;
            this.handleBarHover(datum);
        } else if (datum === null && this.cacheBarHovered !== null) {
            this.cacheBarHovered = datum;
            this.handleBarHover(datum);
        }
    }, 50);

    handleMouseMove = (event) => {
        this.handleMouseMoveThrottled(event.target.getAttribute('data-datum'));
    };

    handleBarClick = (event) => {
        this.props.handleBarClick(JSON.parse(event.target.getAttribute('data-datum')));
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
        const { data, axesProps, margins, stackColors, paddingMultiplier, fillOpacity } = this.props;
        const { legend, padding, tickFormat, ticksCount } = axesProps;
        const defaultMargins = { top: 150, right: 30, bottom: 80, left: 100 };
        const canvasMargins = margins || defaultMargins;
        const svgDimensions = {
            width: Math.max(this.props.parentWidth, 300),
            height: 700,
        };
        const datePlainList = data.reduce((array, item)=>{
            item.values.forEach((item) => {
                array.push(item.dateStart);
                array.push(item.dateEnd);
            });
            return array;
        }, []);

        const yDomain = data.map((item) => (item.titleBar)).reverse();
        const datesDomain = d3extent(datePlainList, d => new Date(d));
        const AxesTicksCount = {
            xAxis: Math.min(
                Math.floor((datesDomain[1] - datesDomain[0]) / (1000 * 60 * 60 * 24)),
                (ticksCount && ticksCount.xAxis) || 30),
            yAxis: (ticksCount && ticksCount.yAxis) || data.length,
        };

        const xScale = scaleTime()
            .domain(datesDomain)
            .range([canvasMargins.left, svgDimensions.width - canvasMargins.right])
            .nice(timeDay, 5);

        const yScale = scaleBand()
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
                
                {/* <BarDescription stackColors={stackColors} left={canvasMargins.left} /> */}
                <svg
                    className = "chart_svg"
                    onMouseMove={this.props.handleBarHover ? this.handleMouseMove : undefined}
                    onClick={this.props.handleBarClick ? this.handleBarClick : undefined}
                    width={svgDimensions.width}
                    height={svgDimensions.height}>
                    <Legend />
                    <TimeSlider
                        width = {svgDimensions.width-slider_x * 2}
                        start_x = {slider_x}
                        start_y = {slider_y}
                        filterData = {this.filterData.bind(this)}
                        xScale = {xScale}
                    />
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
            </div>
        );
    }
}

const responsiveWrapper = ResponsiveWrapper(Chart);
export default responsiveWrapper;
