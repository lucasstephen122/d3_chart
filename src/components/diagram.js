import React, { Component } from 'react';
import diagram_img from '../images/ca-diagram.svg';

class App extends Component {
  render() {
    return (
    	<div className="content-right">
		    <div className="content-right-body">
		        <div className="plant-info">
		            <h2>Plant diagram</h2>
		            <div className="diagram-img">
		                <img src={diagram_img} alt="logo" />
		            </div>
					<div className="plant-bottom">
						<p className="Process-flow-legend">Process flow legend</p>
						<div className="plant-bottom-part">
							<div className="col-md-3 plant-bottom-info">
								<div className="shape">
									<i className="fa fa-map-marker" />
								</div>
								<div className="description">
									<span>Demulsifier injection point</span>
								</div>
							</div>
							<div className="col-md-3">
								<div className="plant-bottom-info">
									<div className="shape">
										<i className="fa fa-arrow-right" />
									</div>
									<div className="description">
										<span>Wet crude</span>
									</div>
								</div>
								<div className="plant-bottom-info">
									<div className="shape">
										<i className="fa fa-arrow-right" />
									</div>
									<div className="description">
										<span>Dry crude</span>
									</div>
								</div>
							</div>
							<div className="col-md-3 plant-bottom-info">
								<div className="shape circle">
									<i className="fa fa-circle" />
								</div>
								<div className="description">
									<span>Target KPI (0.7%)</span>
								</div>
							</div>
							<div className="col-md-3 plant-bottom-info">
								<div className="shape">
									<i className="fa fa-caret-up" />
								</div>
								<div className="description">
									<span>Emulsion sampling point</span>
								</div>
							</div>
						</div>
					</div>
		        </div>
		    </div>
		</div>
    );
  }
}

export default App;
