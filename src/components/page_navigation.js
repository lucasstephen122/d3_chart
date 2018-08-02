import React, { Component } from 'react';
import grid from '../images/grid.png';
import jQuery from 'jquery';
import Cards from './cards';
import PubSub from 'pubsub-js';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          currentlayout: "grid",
        };
      }

     handleIconStatus(val) {
        this.state.currentlayout= val;
          PubSub.publish('Change cards view', val);
     }

     render() {
          const gridstatus = this.state.currentlayout === "grid" ? "active" : "";
          const liststatus = this.state.currentlayout === "list" ? "active" : "";
          return (
               <div className="nav-bar d-flex">
                    <ul className="nav nav-pills tabing" id="pills-tab" role="tablist">
                         <li className="nav-item">
                              <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#Calculator" role="tab" aria-controls="Calculator" aria-selected="true">Calculator</a>
                         </li>
                         <li className="nav-item">
                              <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#Variance" role="tab" aria-controls="Variance" aria-selected="false">Variance</a>
                         </li>
                    </ul>
                    <ul className="grid-icon ml-auto pr-4 pl-0">
                         <li>
                              <a href="#" id="grid" className={'grid-btn grid-list-btn ' +gridstatus} onClick={(e)=>this.handleIconStatus("grid")}><i class="fa fa-th-large" aria-hidden="true"></i></a>
                         </li>
                         <li>
                              <a href="#" id="list" className={'grid-btn grid-list-btn ' +liststatus} onClick={()=>this.handleIconStatus("list")}><i class="fa fa-bars" aria-hidden="true"></i></a>
                         </li>
                    </ul>

               </div>

          );
     }
}

export default App;
