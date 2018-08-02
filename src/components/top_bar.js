import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';
import grid from '../images/grid.png';
import jQuery from 'jquery';
import Cards from './cards';
import PubSub from 'pubsub-js';
class App extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          currentlayout: "grid",
          dropdownOpen: false
        };
      }

     handleIconStatus(val) {
        this.state.currentlayout= val;
          PubSub.publish('Change cards view', val);
     }
     toggle() {
      this.setState(prevState => ({
        dropdownOpen: !prevState.dropdownOpen
      }));
    }
    
     render() {
          const gridstatus = this.state.currentlayout === "grid" ? "active" : "";
          const liststatus = this.state.currentlayout === "list" ? "active" : "";
          return (
               <div className="nav-bar d-flex top-bar">
                    <div className='col-md-6'>
                        <label className='title'>Tank Inventory Forecast</label>
                        <label className="vertical-line"></label>
                        <label className="sub-title">Last Updated : 31 June 2018</label>
                    </div>
                    <div className="col-md-6">
                    <Button className='pull-right margin- ' size='sm' color="info">YTD YEF</Button>{' '}
                    <Dropdown group isOpen={this.state.dropdownOpen} size="sm" className="pull-right" toggle={this.toggle}>
                      <DropdownToggle caret className="custom-dropdown-toggle">
                        Year
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>2017</DropdownItem>
                        <DropdownItem>2018</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={this.state.dropdownOpen} size="sm" className="pull-right" toggle={this.toggle}>
                      <DropdownToggle caret className="custom-dropdown-toggle">
                        Quarter
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Action1</DropdownItem>
                        <DropdownItem>Action2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    </div>
               </div>

          );
     }
}

export default App;
