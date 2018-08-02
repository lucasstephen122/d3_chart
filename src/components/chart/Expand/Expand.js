import React, { Component } from 'react'

export default class Expand extends Component {
    static defaultProps = {
        onClick: (d) => { },
        onClick: (d) => { }
    }

    triggerOver(d) {
        this.props.onClick();
    }
    render() {
        const { margins, svgDimensions } = this.props
        const { width } = svgDimensions

        const Xlabel_x = width - margins.right - 30
        const Xlabel_y = [10]

        return (
            <g fill="none" fillRule="evenodd" style={{ transform: `translateX(${Xlabel_x}px) translateY(${Xlabel_y}px)` }} onClick={this.triggerOver.bind(this)}>
                <g transform="translate(2 2)">
                    <use fill="#000" filter="url(#a)" href="#b"/>
                    <rect width="27" height="27" x=".5" y=".5" stroke="#009E8E" strokeLinejoin="square" rx="6" />
                </g>
                <path fill="#009E8E" d="M14.228 16.872l-3.955 3.955V19.02a.636.636 0 1 0-1.273 0v3.343a.637.637 0 0 0 .636.637h3.344a.636.636 0 0 0 0-1.273h-1.807l3.955-3.955a.636.636 0 0 0-.9-.9M23 9.636v3.343a.636.636 0 1 1-1.273 0v-1.806l-4.023 4.023a.635.635 0 1 1-.9-.9l4.023-4.023H19.02a.636.636 0 0 1 0-1.273h3.344a.637.637 0 0 1 .636.636" />
            </g>
        )
    }
}