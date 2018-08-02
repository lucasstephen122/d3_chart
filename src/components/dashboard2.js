import React from 'react';
import Logo from './logo';
import TopbarNavigation from './topbar_navigation';
import Sidebar from './sidebar';
import LeftNavigation from './left_navigation';
import TrainContent from './train_content';
import Diagram from './diagram';

const dashboard2 = () => {
    return (
        <div className="App">
        	<header className="header d-flex align-items-center">
            	<Logo/>
            	<TopbarNavigation/>
            </header>
            <Sidebar/>
            {/* Content */}
          	<div className="body-content">
                <LeftNavigation/>
                <TrainContent/>
                <Diagram/>
          	</div>
        </div>
    );
}

export default dashboard2;