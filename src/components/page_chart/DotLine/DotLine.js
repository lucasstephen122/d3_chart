import React, { Component } from 'react'
import './DotLine.css'

export default class DotLine extends Component {

    render() {
        const { y_value,text,svgDimensions,scales,margins } = this.props
        const x_translate = margins.left
        const y_translate = scales.yScale(y_value) 
        // {`translate(${x_translate,y_translate})`}
        const line_width = svgDimensions.width - margins.left - margins.right
        const text_x = line_width - 120
        return (
            <g class="tick" opacity="1" transform={`translate(${x_translate} , ${y_translate})`}>
                <line stroke="#000" x2={line_width} stroke-width="2" stroke-dasharray = "5,5" ></line>
                <text fill="#000" x={text_x} dy="-15" font-size="14">{text}</text>
            </g>
        )
    }
}