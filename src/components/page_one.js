import React, { Component } from 'react';
import Card_header from './card-header';
import Chart from './page_chart/Chart'
import area from '../chart-data1'
import line from '../chart-data3'
import PubSub from 'pubsub-js';
import jQuery from 'jquery';

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      currentlayout: "grid-view",
	    };
	 }
  	  render() {
    	return (
	         <div className="chart-content" id="pills-tabContent">
			    <div className="" id="Calculator" role="tabpanel" aria-labelledby="pills-home-tab">
			        <div className="">
			            <div className="chart-pane">
			                <div>
								<Chart type="2" legend="1" areaData={area} lineData={line} extendData='2'/>
			                </div>
							<div>
								<Chart type="2" legend="0" areaData={area} lineData={line} extendData='2'/>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
    	);
  	}
}

export default App;
