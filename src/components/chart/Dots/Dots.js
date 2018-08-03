import React, { Component } from 'react'
import './Dots.css'

export default class Dots extends Component {

    static defaultProps = {
        onClick: (d) => { },
        onClick: (d) => { }
    }

    triggerOut(e) {
        this.props.onMouseOut(e)
    }

    triggerOver(e) {
        const {
            xScale,
            yScale
        } = this.props

        this.props.onMouseOver(e, xScale, yScale)
    }

    render() {
        const { scales, data, type } = this.props
        const { xScale, yScale } = scales
        const dot_color = type == 1 ? '#e0b25c' : '#58478d';
        
        const dots = (
            data.map( datum =>
                <circle
                    key= {Math.random()}
                    className="dot"
                    r = {[5]}
                    stroke={dot_color}
                    cx = {xScale(datum.x)}
                    cy = {yScale(datum.y)}
                    onMouseOver={this.triggerOver.bind(this)}
                    onMouseOut={this.triggerOut.bind(this)}
                />
            )
        )

        return (
            <g> {dots}</g>
        )
    }
}