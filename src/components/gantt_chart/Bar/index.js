import React, {Component} from 'react';

export default class Bar extends Component {
    render() {
        const {fill, height, width, x, y, datum, fillOpacity} = this.props;

        return (
            <rect
                data-type='bar'
                style={this.props.isClickable ? {cursor: 'pointer'} : {}}
                x={x}
                y={y}
                rx = "10"
                ty = "10"
                data-datum={
                    JSON.stringify({...datum, titleBar: this.props.titleBar, metrics: {left: x, top: y, width}})
                }
                height={height}
                width={width}
                fillOpacity={fillOpacity}
                fill={fill} />
        );
    }
}
