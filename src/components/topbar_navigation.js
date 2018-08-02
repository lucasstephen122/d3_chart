import React, { Component } from 'react';
import injection from '../images/injection.png';
import prediction from '../images/prediction.png';
import analysis from '../images/analysis.png';
import emulsion from '../images/emulsion.png';

class TopbarNavigation extends Component {
  render() {
    return (
        <div className="header-right ml-auto">
          <ul>
            <li><a href=""><img src={injection} alt="injection" /><span>Chemical Injection Monitoring</span></a></li>
            <li><a href=""><img src={prediction} alt="prediction" /><span>soft sensor prediction</span></a></li>
            <li><a href=""><img src={analysis} alt="analysis" /><span>analysis performance</span></a></li>
            <li><a href=""><img src={emulsion} alt="emulsion" /><span>predict emulsion</span></a></li>
      		</ul>
        </div>
    );
  }
}

export default TopbarNavigation;
