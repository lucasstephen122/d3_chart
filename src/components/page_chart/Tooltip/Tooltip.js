import React, { Component } from 'react'
import './Tooltip.css'

export default class Tooltip extends Component {

    render() {
        const { tooltip_value, tooltip_date, tooltip_circle_x , tooltip_circle_y , tooltip_display ,tooltip_circle_display } = this.props
        var style;
        if(!tooltip_display){
            style = {
                display:'none', 
            }
        }else{
            style = {
                display:'block', 
            }
        }
        var style_circle;
        if(!tooltip_circle_display){
            style_circle = {
                display:'none', 
            }
        }else{
            style_circle = {
                display:'block', 
            }
        }
        return (
            <g className="" opacity="1"  style={style} id="tooltip_container">
                <circle
                    className = "y"
                    fill = "#58478d"
                    stroke = "#58478d"
                    r = "4"
                    cx = {tooltip_circle_x}
                    cy = {tooltip_circle_y}
                    style={style_circle}
                />
                <rect
                    x={tooltip_circle_x - 50}
                    y={tooltip_circle_y + 10}
                    height="50"
                    fill="white" 
                    width="100"
                    rx = "5"
                    ry = "5"
                    filter="url(#f1)"
                >
                </rect>
                <text fill="#aaa" x={tooltip_circle_x-40} y={tooltip_circle_y+30} fontSize="14" >{tooltip_date}</text>
                <text fill="#009e8e" x={tooltip_circle_x-15} y={tooltip_circle_y+50} fontSize="14" fontWeight="bold">{tooltip_value}</text>
            </g>
        )
    }
}