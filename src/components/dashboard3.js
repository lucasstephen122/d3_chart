import React from 'react';
import TopBar from './top_bar';
import PageOne from './page_one';
import Popup from './Popup';


const dashboard3 = (props) => {
    return (
        <div className="App">
            {/* Content */}
            <div className="body-content1">
              <TopBar/>
              <PageOne/>
              <Popup/>
            </div>
        </div>
    );
}

export default dashboard3;