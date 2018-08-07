import React, { Component } from 'react'
import jQuery from 'jquery';
import GanttChart from './GanttChart';
import {timeFormat} from 'd3-time-format';
import data from '../../chart-data4'
const stackColors = {
    'status-1': {
        color: '#1c2c73',
        legend: 'status first',
    },
    'status-2': {
        color: 'rgba(28, 44, 115, 0.24)',
        legend: 'status second',
    },
};
const axesProps = {
    legend: {
        xAxis: '',
        yAxis: '',
    },
    padding: {
        xAxis: 5,
        yAxis: 5,
    },
    tickFormat: {
        xAxis: timeFormat('%d %B %y'),
    },
};
class Chart extends Component {

    render(){
        return (
                <GanttChart
                    axesProps = {axesProps}
                    data={data}
                    paddingMultiplier={0.6}
                    stackColors={stackColors} 
                    time_slider = {this.props.time_slider}
                />
                
        );
    }
}
export default Chart;
