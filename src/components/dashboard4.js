import React from 'react';
import TopBar from './top_bar';
import PageOne from './page_two';

const dashboard4 = (props) => {
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

export default dashboard4;