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
                        <p className="dot-info-p-value">20/04/2019</p>
                    </div>
                    <div className="dot-info-2">
                        <p className="dot-info-p-title">TIME</p>
                        <p className="dot-info-p-value">20:00:00</p>
                    </div>
                    <div className="dot-info-3">
                        <p className="dot-info-p-title">CHEMICAL INJECTION</p>
                        <p className="dot-info-p-value">122PPM</p>
                    </div>
                </div>
                <div className="dot-comment-div">
                    <div className="comment-info">
                        <span className="comment-name">Sean Chin</span>
                        <span className="comment-date">2 days ago</span>
                    </div>
                    <div className="comment-content">
                        User input comment with number of characters to be limited to 100 characters including spaces
                    </div>
                </div>
            </div>
        )
    }
}