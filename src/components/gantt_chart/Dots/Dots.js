import React, { Component } from 'react'
import './Dots.css'

export default class Dots extends Component {

    static defaultProps = {
        onClick: (d) => { },
        onClick: (d) => { }
    }

    triggerOut(d, e) {
        this.props.onMouseOut(e, d)
    }

    triggerOver(d, e) {
        const {
            xScale,
            yScale
        } = this.props

        this.props.onMouseOver(e, d, xScale, yScale)
    }

    render() {
        const { scales, data } = this.props
        const { xScale, yScale } = scales
        const dot_color = '#58478d';
        
        const dots = (
            data.map( datum =>
                <circle
                    key= {Math.random()}
                    className="dot"
                    r = {[6]}
                    stroke = {dot_color}
                    cx = {xScale(datum.parsed_date)}
                    cy = {yScale(datum.value3)}
                    onMouseOut={this.triggerOut.bind(this, datum)}
                    onMouseOver={this.triggerOver.bind(this, datum)}
                    onMouseMove={this.triggerOver.bind(this, datum)}
                />
            )
        )

        return (
            <g> {dots}</g>
        )
    }
}