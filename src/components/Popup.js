import React, { Component } from 'react'
import jQuery from 'jquery'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PubSub from 'pubsub-js';
import Chartformodal from './chart/Chart_for_modal'
import area from '../chart-data1'
import line from '../chart-data2'

class Popup extends Component {
	constructor(props) {
	   super(props);
	   this.state = { modal: false, type: '1'};
	   this.toggle = this.toggle.bind(this);
	   this.subscriber = this.subscriber.bind(this);
	 }

	 toggle() {
	   this.setState({
	     modal: !this.state.modal
	   });
	 }

	 componentDidMount() {
	 	this.token = PubSub.subscribe("Load Chart", this.subscriber);
	 }

	 componentWillUnmount(){
	 	PubSub.unsubscribe(this.token);
	 }
	 subscriber(msg, data) {
	 	this.setState({
	 	  modal: !this.state.modal,
	 	  type:data
	 	});
	 }

	 render() {
	   return (
	   		<div>
	   			<Modal isOpen={this.state.modal}>
	   					<ModalHeader>Chart</ModalHeader>
	   						<ModalBody>
	   							<div className="row">
								   	<div className="form-group col-md-12 chartwrapper">
								   	<Chartformodal type={this.state.type} areaData={area} lineData={line}/>
								   	</div>
	   							</div>
	   					</ModalBody>
	   					<ModalFooter>
						   	<Button color="danger" onClick={this.toggle}>Cancel</Button>
	   					</ModalFooter>
	   			</Modal>
	   		</div>
	   );
	 }
}

export default Popup;