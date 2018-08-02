import React, { Component } from 'react';
import Card_header from './card-header';
import Chart from './chart/Chart'
import area from '../chart-data1'
import line from '../chart-data2'
import PubSub from 'pubsub-js';
import jQuery from 'jquery';

class App extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	      currentlayout: "grid-view",
	    };
	    this.subscriber = this.subscriber.bind(this);
	 }

	 componentDidMount() {
	  	this.token = PubSub.subscribe("Change cards view", this.subscriber);
	 }

	 componentWillUnmount(){
	  	PubSub.unsubscribe(this.token);
	 }

	 subscriber(msg, data) {
	  	this.setState({
	  		currentlayout: data+'-view'
	  	});
	  }
  	  render() {
    	return (
	         <div className={"tab-content graphs list-view " +this.state.currentlayout} id="pills-tabContent">
			    <div className="tab-pane fade show active" id="Calculator" role="tabpanel" aria-labelledby="pills-home-tab">
			        <div className="graph-tabs">
			            <div className="graph-1">
			                <div className="train-a">
			                    <Card_header />
			                </div>
			                <div>
			                    <Chart type="1" areaData={area} lineData={line} extendData='1'/>
			                </div>
			            </div>
			            <div className="graph-1">
			                <div className="train-a train-b">
								<Card_header />
			                </div>
			                <div>
								<Chart type="2" areaData={area} lineData={line} extendData='2'/>
			                </div>
			            </div>
			        </div>
			    </div>
			    <div className="tab-pane fade" id="Variance" role="tabpanel" aria-labelledby="pills-profile-tab">
			        Consequat occaecat ullamco amet non     eiusmod nostrud dolore irure incididunt est duis anim sunt officia. Fugiat velit proident aliquip nisi incididunt nostrud exercitation proident est nisi.
			    </div>
			</div>
    	);
  	}
}

export default App;
