import React, { Component } from 'react'
import './Tooltip.css'
import * as moment from 'moment'
export default class Tooltip extends Component {

    render() {
        const { tooltip_value, tooltip_x , tooltip_y , tooltip_display } = this.props

        var style;
        if(!tooltip_display){
            style = {
                display:'none',
            }
        }else{
            style = {
                display:'block',
                left: tooltip_x+20,
                top: tooltip_y,
                opacity: 1 
            }
        }
        return (
            <div className="tooltip" style={style}>
                <div className ="head_bar">
                    <p>+$1/MMBTU +$5 Million</p>
                </div>
                <div className ="title_bar">
                    <p>Vessel 1(Incoterm)</p>
                    <p>Shipname</p>
                </div>
                <div className="dot-info-div">
                    <div className="dot-info-1">
                        <p className="dot-info-p-title">ETD</p>
                        <p className="dot-info-p-value">{moment(tooltip_value.dateStart).format("DD MMM YYYY")}</p>
                    </div>
                    <div className="dot-info-2">
                        <p className="dot-info-p-title">ADPETD</p>
                        <p className="dot-info-p-value">{moment(tooltip_value.dateEnd).format("DD MMM YYYY")}</p>
                    </div>
                    <div className="dot-info-3">
                        <p className="dot-info-p-title">DelayFastDays</p>
                        <p className="dot-info-p-value">{moment(tooltip_value.dateStart).format("DD MMM YYYY")}</p>
                    </div>
                </div>
                <div className ="port_bar">
                    <p>{tooltip_value.titleBar}</p>
                </div>
                <div className="dot-info-div">
                    <div className="dot-info-1">
                        <p className="dot-info-p-title">ETD</p>
                        <p className="dot-info-p-value">{moment(tooltip_value.dateStart).format("DD MMM YYYY")}</p>
                    </div>
                    <div className="dot-info-2">
                        <p className="dot-info-p-title">ADPETD</p>
                        <p className="dot-info-p-value">2{moment(tooltip_value.dateEnd).format("DD MMM YYYY")}</p>
                    </div>
                </div>
                <div className ="port_bar">
                    <p>{tooltip_value.titleBar}</p>
                </div>
                <hr/>
                <div className="dot-info-div">
                    <div className="dot-info-3">
                        <p className="dot-info-p-title">Customer</p>
                        <p className="dot-info-p-value">CPC</p>
                    </div>
                    <div className="dot-info-3">
                        <p className="dot-info-p-title">Loadsize</p>
                        <p className="dot-info-p-value">68</p>
                    </div>
                </div>
            </div>
        )
    }
}