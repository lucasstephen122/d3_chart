import React, { Component } from 'react'
import * as d3 from 'd3-shape'
import animateWithEase from '../animateWithEase';
import { easeLinear } from 'd3-ease'
class Area extends Component {

    render() {
        const { scales, data, margins ,display} = this.props
        const { xScale, yScale } = scales
       
        const fill_color = 'rgba(88, 71, 141, 0.1)' ;
        const area = d3.area()
            .curve(d3.curveBasis)
            .x(function (d) { return xScale(d.parsed_date); })
            .y0(function (d) { return yScale(d.value2); })
            .y1(function (d) { return yScale(d.value1); })

        const newarea = area(data)
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
            <path style={style} className="line" fill={fill_color} d={newarea}></path>
            
        );
    }
}
const easeData = (data, t) => {
    // Performing a basic left-right linear paint of the graph,
    // so use easeLinear to calculate how many items should be in the array rather than modify the actual values in the array
    return data.slice(0,Math.floor(data.length * easeLinear(t)));
};
  
export default animateWithEase(Area, {
    easeData,
    duration: 2000,
    delay: 1500,
    interval: 10,
});