import React, { Component } from 'react'
import './Tooltip.css'

export default class Dots extends Component {

    render() {
        const { xTooltip, yTooltip, t_opacity} = this.props

        var style = {
            left: xTooltip? xTooltip: -10000,
            top: yTooltip? yTooltip: -10000,
            opacity: t_opacity? 1: 0
        }

        return (
            <div className="tooltip" style={style}>
                <div className="dot-info-div">
                    <div className="dot-info-1">
                        <p className="dot-info-p-title">DATE</p>
                        <p className="dot-info-p-value">20/04/2018</p>
                    </div>
                </div>
            </div>
        )
    }
}