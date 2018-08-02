import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import jQuery from 'jquery';
import Axes from './Axes/Axes'
import Areas from './Area/Area'
import Lines from './Line/Line'
import Legend from './Legend/Legend'
import Extend from './Expand/Expand'
import Tooltip from './Tooltip/Tooltip'
import Dots from './Dots/Dots'
import AxisLabel from './AxisLabel/AxisLabel'
import ResponsiveWrapper from './ResponsiveWrapper/ResponsiveWrapper'
import PubSub from 'pubsub-js';
import x_data from '../../chat-x-data'
class Chart extends Component {
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
            xTooltip: e.pageX,
            yTooltip: e.pageY,
            t_opacity: 1
        })
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
        const is_legend = this.props.legend
        let margin_top = 70
        let margin_bottom = 40
        if(is_legend == 0){
            margin_top = 0
        }else if(is_legend == 1){
            margin_bottom = 0
        }
        const margins = { top: margin_top, right: 50, bottom: margin_bottom, left: 80 }
        const svgDimensions = {
            width: this.state.containerwidth,
            height: 500
        }
        //console.log(this.state.containerwidth);
        /* const maxValue = Math.max(...this.props.areaData.map(d => d.y)) */
        const maxValue = Math.max(...x_data.map(d => d.value))
        const xScale = this.xScale
            // .domain(x_data.map(d => d.title))
            .domain([, 600])
            .range([margins.left, svgDimensions.width - margins.right])
        // alert(maxValue);
        const yScale = this.yScale
            .domain([0, 800])
            .range([svgDimensions.height - margins.bottom, margins.top])

        const xLabels = [{text:'Tank' , x:60 , y:90} , {text:'Inventory' , x:42 , y:110} , {text:'(`000 M3)' , x:46 , y:130}]
        
        
        let legend_pane
        if(is_legend == 1){
            legend_pane = <Legend />
        }else{
            legend_pane = ""
        }
        console.log(legend_pane)
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
                    
                    {legend_pane}
                    <AxisLabel 
                        svgDimensions={svgDimensions}
                        xLabel={xLabels}
                    />
                </svg>
                <Tooltip {...this.state}/>
            </div>
        )
    }
}

export default ResponsiveWrapper(Chart)