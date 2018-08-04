import React, { Component } from 'react'
import * as d3 from 'd3-shape'

export default class Line extends Component {

    render() {
        const { svgDimensions, margins, scales, data , type } = this.props
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
                        />
                );
            }
        }
        return (
            <g>{bars}</g>
        )
    }
}