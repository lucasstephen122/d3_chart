import React, { Component } from 'react';
import EmulationChart from './chart/EmulationChart'
import area from '../chart-data1'
import line from '../chart-data2'
class App extends Component {
  render() {
    return (
        <div className="content-center">
		    <div className="content-centger-body">
		        <div className="predicted-info">
		            <h2 className="predicted-main-title"><a className="predicted-title">predicted emultion at<span>FQY 160</span></a></h2>
    			    <div className="multi-collapse predicted">
          		  		<div className="predicted-data">
          		  			<ul>
          		  				<li>
          		  					<h5>Anding</h5> 
          		  					<span>1</span>
          		  				</li>
          		  				<li>
          		  					<h5>Angsi</h5> 
          		  					<span>39</span>
          		  				</li>
          		  				<li>
          		  					<h5>Anjung Kecil</h5> 
          		  					<span>48</span>
          		  				</li>
          		  			</ul>
          		  		</div>
    			    </div>
		            <div className="multi-collapse">
		                <div className="predicted-train">
		                    <div className="train-left">
		                        <h3>Train A</h3>
		                        <h4>INJECTION DOSAGE</h4>
		                        <p>23<span>PPM</span></p>
		                    </div>
		                    <div className="train-left train-right">
		                        <h3>Train B</h3>
		                        <h4>INJECTION DOSAGE</h4>
		                        <p>23<span>PPM</span></p>
		                    </div>
		                </div>
		                <div className="predicted-percenatge">
		                    <h3>0.5<span>%</span></h3>
		                    <p>CONFIDENCE LEVEL</p>
		                    <h4>High</h4>
		                </div>
		            </div>
		        </div>
		        <hr />
		        <div className="predicted-graph">
		            <h2>Graph name</h2>
					<EmulationChart type="1" areaData={area} lineData={line} />

		        </div>
		    </div>
		</div>
    );
  }
}

export default App;
