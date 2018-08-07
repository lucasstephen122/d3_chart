import React, {Component} from 'react';
import * as d3 from 'd3';
import './slider.css';
import {select as d3Select} from 'd3-selection';
import { drag as d3Drag } from 'd3-drag';
import {event as currentEvent} from 'd3';
import {scaleBand, scaleTime} from 'd3-scale';
import * as moment from 'moment'
import { timeFormat } from 'd3-time-format'
import * as d3Axis from 'd3-axis'
// import * as d3 from "d3";
const DEFAULT_COLOR = '#37474F';

export default class TimeSlider extends Component {
    constructor(props){
        super(props);
        const { start_x , start_y , width} = this.props
        console.log(width)
        this.settings = {
            min: 0,
            max: width,
            radius: 8,
            offset: Math.floor(4),        
            color: "#009e8e",
            opacity: {
              full: 1.0,
              medium: 0.8,
              half: 0.5,
              light: 0.3
            },
            // translater: translater,
            // callback: callback
        };
        this.elements = {
            min: { value: 0 },
            max: { value: width }
        }
        
        this.timeScale = scaleTime()
        this.CallBack = this.CallBack.bind(this)
    }
    componentDidMount() {
        this.sliderEvent()
        this.renderAxis()
        
    }
    componentDidUpdate() {
        this.sliderEvent()
        this.renderAxis()
    }
    handleDragStarted(d){
 
    }
    handleDragged(){
        // d3Select(this).attr("cx", currentEvent.x);
        var x= currentEvent.x
        if (x >= this.settings.min && x <= this.elements.max.value) {
            this.elements.min.value = x;
            d3Select(this.minCircle).attr('cx', x);
            this.CallBack(this.translator(this.elements.min.value),this.translator(this.elements.max.value));
        }
    }
    handleDragged1(){
        // d3Select(this).attr("cx", currentEvent.x);
        var x= currentEvent.x
        if (x >= this.elements.min.value && x <= this.settings.max) {
            this.elements.max.value = x;
            d3Select(this.maxCircle).attr('cx', x);
            this.CallBack(this.translator(this.elements.min.value),this.translator(this.elements.max.value));
        }
    }
    CallBack(dstart,dend){
        this.props.filterData(dstart.value,dend.value)
    }
    handleDragEnded(){
        
    }
    sliderEvent(){
        d3Select(this.minCircle)
            .call(
                d3Drag()
                .on('drag', this.handleDragged.bind(this))
            );
        d3Select(this.maxCircle)
            .call(
                d3Drag()
                .on('drag', this.handleDragged1.bind(this))
            );
    }
    renderAxis() {
        const axisType = "axisBottom"
        const axis = d3Axis[axisType]()
                .scale(this.timeScale)
                .tickPadding([10])
                .tickFormat(timeFormat("%b ` %d"))
        d3Select(this.axisElement).call(axis)

        var ticks = d3Select(this.axisElement).selectAll(".slider .tick");
        ticks.each(function() {
            d3Select(this).append("circle").attr("r", 4).attr("cx",0).attr("cy",1).attr("fill","#ccc"); 
        });

        ticks.selectAll("line").remove(); 
    }
    translator(x){
        var m = moment(this.timeScale.invert(x)),
            ret = {
              x: x,
              text: null,
              value: m
            };
        
        if (m.isValid()) {
          ret.text = m.format("YYYY-MM-DD");
        }
        return ret;
    }
    render() {
        const { start_x , start_y , width , display} = this.props
        var style;
        if(!display){
            style = {
                display : 'none'
            }
        }
        this.settings.max = width
        var min = moment("2017-01-01")
        var max = moment("2017-12-01")
        this.timeScale.domain([min.toDate(), max.toDate()]).range([0, this.settings.max]);
        return (
            <g className="slider" transform={`translate(${start_x} , ${start_y})`} style={style}>
                <g
                    className={`Axis Axis-Bottom`}
                    ref={(el) => { this.axisElement = el; }}
                    transform = "translate(0,8)"
                />
                <ellipse 
                    className="min_circle" 
                    ref={(el) => { this.minCircle = el; }}
                    cx={this.settings.min} 
                    cy={this.settings.radius} 
                    rx={this.settings.radius} 
                    ry={this.settings.radius} 
                    fill={this.settings.color} 
                    fillOpacity="1" 
                    className = "slider_circle"
                    filter="url(#ellipse_shadow)"
                    ></ellipse>
                <ellipse 
                    className="max_circle"
                    ref={(el) => { this.maxCircle = el; }}
                    cx={this.settings.max} 
                    cy={this.settings.radius} 
                    rx={this.settings.radius} 
                    ry={this.settings.radius} 
                    fill={this.settings.color} 
                    fillOpacity="1" 
                    className = "slider_circle"
                    filter="url(#ellipse_shadow)"
                    ></ellipse>
            </g>
        )
    }
}
