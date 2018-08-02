import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import jQuery from 'jquery';
import Axes from './Axes/Axes'
import Areas from './Area/Area'
import Lines from './Line/Line'
import Legend from './Legend/Legend'
import Extend from './Expand/Expand'
import Tooltipmodal from './Tooltip/Tooltipformodal'
import Dots from './Dots/Dots'
import AxisLabel from './AxisLabel/AxisLabel'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
import PubSub from 'pubsub-js';

class Chartformodal extends Component {
    constructor(props) {
        super(props)
        this.xScale = scaleLinear()
        this.yScale = scaleLinear()
        this.state = {
            xTooltip: null,
            yTooltip: null,
            t_opacity: null,
            containerwidth:jQuery(".Responsive-wrapper").width()
        }
        this.subscriber = this.subscriber.bind(this);
    }

    mouseOut(e, d) {
        this.setState({
            xTooltip: null,
            yTooltip: null,
            t_opacity: null
        })
    }

    mouseOver(e, d) {
        this.setState({
            xTooltip: parseInt(e.target.getAttribute('cx')),
            yTooltip: parseInt(e.target.getAttribute('cy')),
            t_opacity: 1
        });
    }

    loadModal(e, d) {
      PubSub.publish('Load Chart', this.props.extendData);
    }

    componentDidMount() {
        this.token = PubSub.subscribe("Change cards view", this.subscriber);
        this.token = PubSub.subscribe("Load Chart", this.subscriber);
    }

    componentWillUnmount(){
        PubSub.unsubscribe(this.token);
    }

    subscriber(msg, data) {
        this.setState({
            containerwidth: jQuery(".Responsive-wrapper").width()
        });
     
     }


    render() {
        const margins = { top: 70, right: 50, bottom: 40, left: 80 }
        const svgDimensions = {
            width: jQuery(".chartwrapper").width(),
            height: 500
        }
        //console.log(this.state.containerwidth);
        /* const maxValue = Math.max(...this.props.areaData.map(d => d.y)) */

        const xScale = this.xScale
            .domain([-600, 600])
            .range([margins.left, svgDimensions.width - margins.right])

        const yScale = this.yScale
            .domain([1400, 0])
            .range([svgDimensions.height - margins.bottom, margins.top])

        return (
            <div>
                <svg width={svgDimensions.width} height={svgDimensions.height}>
                    <defs>
                        <pattern id="diagonal-stripe-5" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-60)">
                            <rect width="1" height="4" transform="translate(0,0)" fill="#aaaaaa"></rect>
                        </pattern>
                    </defs>
                    <defs>
                        <rect id="b" width="28" height="28" rx="6" />
                        <filter id="a" width="121.4%" height="121.4%" x="-10.7%" y="-10.7%" filterUnits="objectBoundingBox">
                            <feOffset in="SourceAlpha" result="shadowOffsetOuter1" />
                            <feMorphology in="SourceAlpha" radius="1" result="shadowInner" />
                            <feOffset in="shadowInner" result="shadowInner" />
                            <feComposite in="shadowOffsetOuter1" in2="shadowInner" operator="out" result="shadowOffsetOuter1" />
                            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="1" />
                            <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 0 0.8 0 0 0 1 0" />
                        </filter>
                    </defs>
                    <Axes
                        scales={{ xScale, yScale }}
                        margins={margins}
                        svgDimensions={svgDimensions}
                    />
                    <Areas
                        scales={{ xScale, yScale }}
                        margins={margins}
                        data={this.props.areaData}
                        svgDimensions={svgDimensions}
                    />
                    <Lines
                        scales={{ xScale, yScale }}
                        data={this.props.lineData}
                        type={this.props.type}
                    />
                    <Legend />
                    <Dots
                        scales={{ xScale, yScale }}
                        margins={margins}
                        type={this.props.type}
                        data={this.props.lineData}
                        svgDimensions={svgDimensions}
                        onMouseOver={this.mouseOver.bind(this)}
                        onMouseOut={this.mouseOut.bind(this)}
                    />
                    <AxisLabel 
                        svgDimensions={svgDimensions}
                        xLabel={'ACTUAL INJECTION DOSAGE'}
                        yLabel={'TIME'}
                    />
                </svg>
                <Tooltipmodal {...this.state}/>
            </div>
        )
    }
}

export default ResponsiveWrapper(Chartformodal)