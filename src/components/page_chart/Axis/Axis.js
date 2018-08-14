import React, { Component } from 'react'
import { timeFormat } from 'd3-time-format'
import * as d3Axis from 'd3-axis'
import { select as d3Select } from 'd3-selection'

import './Axis.css'

export default class Axis extends Component {
    componentDidMount() {
        this.renderAxis()
    }

    componentDidUpdate() {
        this.renderAxis()
    }

    renderAxis() {
        const axisType = `axis${this.props.orient}`
        console.log(axisType)
        const axis = d3Axis[axisType]()
                .scale(this.props.scale)
                .tickSize(-this.props.tickSize)
                .tickPadding([20])
                .tickValues(this.props.tickValues)
                .ticks(5)
        if (this.props.orient == 'Bottom'){
            axis.tickFormat(timeFormat("%b ` %d"))
        }
        d3Select(this.axisElement).call(axis)
    }

    render() {
        const type = this.props.type
        let extra_class = ""
        if(type == "1"){
            extra_class = "text_none"
        }
        return (
            <g
                className={`Axis Axis-${this.props.orient} ${extra_class}`}
                ref={(el) => { this.axisElement = el; }}
                transform={this.props.translate}
            />
        )
    }
}