import React, { Component } from 'react';
import Chart from './page_chart/Chart'
import data from '../chart-data3'

class App extends Component {
	constructor(props) {
	    super(props);
	 }
  	  render() {
    	return (
	         <div className="tab-content graphs list-view chart-content" id="pills-tabContent">
			    <div className="" id="Calculator" role="tabpanel" aria-labelledby="pills-home-tab">
			        <div className="graph-tabs">
			            <div className="graph-1 chart-pane">
			                <div>
								<Chart data={data}/>
			                </div>
			            </div>
			        </div>
			    </div>
			</div>
    	);
  	}
}

export default App;
