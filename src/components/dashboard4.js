import { Component } from 'react';
import React from 'react';
import TopBar from './top_bar1';
import PageOne from './page_two';

class dashboard4 extends Component {
    constructor(props){
        super(props)
        this.state = {
            ytd_yef:true
        }
    }
    onYTDClicked(e){
        this.setState({
            ytd_yef : !this.state.ytd_yef
        })
    }
    render(){
        return (
            <div className="App">
                {/* Content */}
                <div className="body-content1">
                <TopBar onYTDClicked = {this.onYTDClicked.bind(this)}/>
                <PageOne 
                    time_slider = {this.state.ytd_yef}
                />
                </div>
            </div>
        );
    }
}

export default dashboard4;