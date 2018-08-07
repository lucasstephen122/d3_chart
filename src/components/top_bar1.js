import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Button } from 'reactstrap';
import PubSub from 'pubsub-js';
class App extends Component {
    constructor(props) {
        super(props);
        this.toggle1 = this.toggle1.bind(this);
        this.toggle2 = this.toggle2.bind(this);
        this.toggle3 = this.toggle3.bind(this);
        this.state = {
          currentlayout: "grid",
          dropdownOpen1: false,
          dropdownOpen2: false,
          dropdownOpen3: false,
          button : true,
        };
      }

     handleIconStatus(val) {
        this.state.currentlayout= val;
          PubSub.publish('Change cards view', val);
     }
     toggle1() {
      this.setState(prevState => ({
        dropdownOpen1: !prevState.dropdownOpen1
      }));
    }
    toggle2() {
     this.setState(prevState => ({
       dropdownOpen2: !prevState.dropdownOpen2
     }));
    }
    toggle3() {
      this.setState(prevState => ({
        dropdownOpen3: !prevState.dropdownOpen3
      }));
     }
     toggleClick(e){
        this.props.onYTDClicked(e)  
     }
     render() {
          const gridstatus = this.state.currentlayout === "grid" ? "active" : "";
          const liststatus = this.state.currentlayout === "list" ? "active" : "";
          return (
               <div className="nav-bar d-flex top-bar">
                    <div className='col-md-6 top-bar-1'>
                        <label className='title'>Cargo Upside Simulation</label>
                        <label className="vertical-line"></label>
                        <label className="sub-title">Last Updated : 31 June 2018</label>
                    </div>
                    <div className="col-md-6 top-bar-2">
                    <Button className='pull-right margin- ' onClick={this.toggleClick.bind(this)} size='sm' color="info">YTD YEF</Button>{' '}
                    <Dropdown group isOpen={this.state.dropdownOpen1} size="sm" className="pull-right" toggle={this.toggle1}>
                      <DropdownToggle caret className="custom-dropdown-toggle">
                        Year
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>2017</DropdownItem>
                        <DropdownItem>2018</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={this.state.dropdownOpen2} size="sm" className="pull-right" toggle={this.toggle2}>
                      <DropdownToggle caret className="custom-dropdown-toggle">
                        Quarter
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>Quarter1</DropdownItem>
                        <DropdownItem>Quarter2</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={this.state.dropdownOpen3} size="sm" className="pull-right" toggle={this.toggle3}>
                      <DropdownToggle caret className="custom-dropdown-toggle">
                        Month
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem>January</DropdownItem>
                        <DropdownItem>Februry</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    </div>
               </div>

          );
     }
}

export default App;
