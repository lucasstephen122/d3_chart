import React, { Component } from 'react'
import   "./Bar.css"
import { timeParse } from 'd3-time-format'
import { easeCubicInOut } from 'd3-ease';
import animateWithEase from '../animateWithEase';
class Bars extends Component {
    triggerOut(e) {
        this.props.onMouseOut(e)
    }

    triggerOver(e) {
        const { type } = this.props
        this.props.onMouseOver(e,type)
    }
    render() {
        const { svgDimensions, margins, scales, data , type ,display} = this.props
        const { xScale, yScale1 } = scales

        const { height , width } = svgDimensions

        let bar_width = (width-data.length*3) / data.length
        //console.log(height - margins.bottom)
        
        let bars = []
        if(type == 1){
            for(let key=0;key<data.length;key++){
                if(key == data.length-1)continue
                bars.push(
                        <rect
                        key={data[key].parsed_date}
                        x={xScale(data[key].parsed_date)}
                        y={yScale1(data[key].value4)}
                        height={(height - margins.bottom - scales.yScale1(data[key].value4)) - (height - margins.bottom - scales.yScale1(0))}
                        width={bar_width}
                        fill="#04656c"
                        onMouseEnter={this.triggerOver.bind(this)}
                        onMouseOut={this.triggerOut.bind(this)}
                        className = "bar_element"
                        />
                );
            }
            
        }else{
            for(let key=0;key<data.length;key++){
                if(key == data.length-1)continue
                bars.push(
                        <rect
                        key={data[key].parsed_date}
                        x={xScale(data[key].parsed_date)}
                        y={yScale1(0)}
                        height={(height - margins.bottom - scales.yScale1(0)) - (height - margins.bottom - scales.yScale1(data[key].value5))}
                        width={bar_width}
                        fill="#1c2c73"
                        onMouseEnter={this.triggerOver.bind(this)}
                        onMouseOut={this.triggerOut.bind(this)}
                        className = "bar_element"
                        />
                );
            }
        }
        var style
        if(!display){
            style = {
                display:'none', 
            }
        }else{
            style = {
                display:'block', 
            }
        }
        return (
            <g style={style}>{bars}</g>
        )
    }
}
const easeData = (data, t) => {
    // Performing a basic left-right linear paint of the graph,
    // so use easeLinear to calculate how many items should be in the array rather than modify the actual values in the array
    //console.log("easeLinear",data.length * easeLinear(t))
    var parseDate = timeParse("%Y-%m-%d");
    return data.map(x => ({
        parsed_date: parseDate(x.datetime),
        value4: x.value4 * easeCubicInOut(t),
        value5: x.value5 * easeCubicInOut(t),
    }));
};
  
export default animateWithEase(Bars, {
    easeData,
    duration: 3000,
    delay: 1000,
    interval: 10,
});