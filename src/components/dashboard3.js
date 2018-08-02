import React from 'react';
import TopBar from './top_bar';
import PageOne from './page_one';

const dashboard3 = (props) => {
    return (
        <div className="App">
            {/* Content */}
            <div className="body-content1">
              <TopBar/>
              <PageOne/>
            </div>
        </div>
    );
}

export default dashboard3;