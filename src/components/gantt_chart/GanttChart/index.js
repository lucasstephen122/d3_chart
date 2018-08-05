import React, {Component} from 'react';
import {scaleBand, scaleTime} from 'd3-scale';
import {interpolateLab} from 'd3-interpolate';
import {extent as d3extent} from 'd3-array';
import throttle from 'lodash.throttle';
import {timeDay} from 'd3-time';

import Axes from '../Axes';
import StackedBarHorizontal from '../StackedBar/horizontal';
import ResponsiveWrapper from '../ResponsiveWrapper/ResponsiveWrapper';
import Legend from '../Legend/Legend'
// import BarDescription from '../Legends';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';
const defaultPaddingMultiplier = 0;
const DEFAULT_FILL_OPACITY = 1;

class Chart extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          dropdownOpen: false,
        };
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

    render() {
        const { data, axesProps, margins, stackColors, paddingMultiplier, fillOpacity } = this.props;
        const { legend, padding, tickFormat, ticksCount } = axesProps;
        const defaultMargins = { top: 70, right: 30, bottom: 80, left: 100 };
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

        const yDomain = data.map((item) => (item.titleBar));
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
            .nice(timeDay, 1);

        const yScale = scaleBand()
            .padding(paddingMultiplier || defaultPaddingMultiplier)
            .domain(yDomain)
            .range([svgDimensions.height - canvasMargins.bottom, canvasMargins.top]);

        // const height = 14;
        const height = Math.max(0, yScale.bandwidth());
        return (
            <div class='svg_container'>
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
                    <Axes
                        scales={{xScale, yScale}}
                        padding={padding}
                        margins={canvasMargins}
                        ticksCount={AxesTicksCount}
                        tickFormat={tickFormat}
                        svgDimensions={svgDimensions}
                        legend={legend} />
                    {data.map(datum => (
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
