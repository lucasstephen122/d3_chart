import React, { Component } from 'react';
import jQuery from 'jquery';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import dashboard1 from './components/dashboard1';
import dashboard2 from './components/dashboard2';
import dashboard3 from "./components/dashboard3";
import dashboard4 from "./components/dashboard4";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';


class App extends Component {
    componentDidMount() {
        jQuery(".switch-slider span").on("click", function(){
            jQuery(".switch-slider span").removeClass("active");
            jQuery(this).toggleClass("active");
        });
        jQuery(".predicted-main-title").click(function(){
            jQuery(".predicted").toggle(400);
        });
    }
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/dashboard1" component={ dashboard1 }/>
                    <Route exact path="/dashboard2" component={ dashboard2 }/>
                    <Route exact path="/dashboard3" component={ dashboard3 }/>
                    <Route exact path="/dashboard4" component={ dashboard4 }/>
                    <Redirect to="/dashboard1"/>
                </Switch>
            </Router>
        );
    }
}
export default App;
