import React, { Component } from 'react'
import * as d3 from 'd3-shape'
import { easeLinear } from 'd3-ease';
import animateWithEase from '../animateWithEase';
import data from '../../../chart-data3'
class Line extends Component {
    componentDidMount() {
        
    }
    render() {
        const { scales, data1,display } = this.props
        const { xScale, yScale } = scales
        const line_color = '#58478d' ;
        const line = d3.line()
            .x(function (d) { return xScale(d.parsed_date); })
            .y(function (d) { return yScale(d.value3); })

        const newline = line(data1);
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
            <path style={style} className="line" fill="none" stroke={line_color} strokeWidth="2px" d={newline}></path>
        )
    }
}
const easeData = (data, t) => {
    return data.slice(0,Math.floor(data.length * easeLinear(t)));
};
  
export default animateWithEase(Line, {
    easeData,
    duration: 2000,
    delay: 500,
    interval: 10,
    data: data,
});