import React, {Component} from 'react';
import * as d3 from 'd3';
import './slider.css';
import {select as d3Select} from 'd3-selection';
import { drag as d3Drag } from 'd3-drag';
import {event as currentEvent} from 'd3';
// import * as d3 from "d3";
const DEFAULT_COLOR = '#37474F';

export default class TimeSlider extends Component {
    constructor(props){
        super(props);
        const { start_x , start_y , width} = this.props
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
    }
    componentDidMount() {
        d3Select(this.minCircle)
            .call(
                d3Drag()
                .on('start', this.handleDragStarted)
                .on('drag', this.handleDragged)
                .on('end', this.handleDragEnded)
            );
    }
    componentDidUpdate() {
    }
    handleDragStarted(d){
        console.log(this)
    }
    handleDragged(d){
        console.log(currentEvent.x)
        d3Select(this).attr("cx", currentEvent.x);
    }
    handleDragEnded(){
        console.log("111")
    }
    render() {
        const { start_x , start_y , width} = this.props
        return (
            <g className="slider" transform={`translate(${start_x} , ${start_y})`}>
                <line x1="0" y1="8" x2={width} y2="8" stroke="#ccc" strokeWidth="2"></line>
                <ellipse 
                    className="min_circle" 
                    ref={(el) => { this.minCircle = el; }}
                    cx={this.settings.min} 
                    cy={this.settings.radius} 
                    rx={this.settings.radius} 
                    ry={this.settings.radius} 
                    fill={this.settings.color} 
                    fillOpacity="1" 
                    className = "slider_circle"></ellipse>
                {this.min_circle}
                <ellipse 
                    cx={this.settings.max} 
                    cy={this.settings.radius} 
                    rx={this.settings.radius} 
                    ry={this.settings.radius} 
                    fill={this.settings.color} 
                    fillOpacity="1" 
                    className = "slider_circle"></ellipse>
            </g>
        )
    }
}
