import React, {Component} from 'react';
import * as d3 from 'd3';
import './slider.css';

const DEFAULT_COLOR = '#37474F';

export default class TimeSlider extends Component {
    render() {
        const { start_x , start_y , width} = this.props
        const settings = {
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
        return (
            <g className="slider" transform={`translate(${start_x} , ${start_y})`}>
                <line x1="0" y1="8" x2={width} y2="8" stroke="#ccc" stroke-width="2"></line>
                <ellipse cx={settings.min} cy={settings.radius} rx={settings.radius} ry={settings.radius} fill={settings.color} fill-opacity="1" className = "slider_circle"></ellipse>
                <ellipse cx={settings.max} cy={settings.radius} rx={settings.radius} ry={settings.radius} fill={settings.color} fill-opacity="1" className = "slider_circle"></ellipse>
            </g>
        )
    }
}
