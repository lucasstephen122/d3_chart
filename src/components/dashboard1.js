import React from 'react';
import Logo from './logo';
import TopbarNavigation from './topbar_navigation';
import Sidebar from './sidebar';
import PageNavigation from './page_navigation';
import Cards from './cards';
import Popup from './Popup';


const dashboard1 = (props) => {
    return (
        <div className="App">
          <header className="header d-flex align-items-center">
              <Logo/>
              <TopbarNavigation/>
            </header>
            <Sidebar/>
            {/* Content */}
            <div className="body-content" style={{marginTop:'10px', }}>
              <PageNavigation/>
              <Cards/>
                <Popup/>
            </div>
        </div>
    );
}

export default dashboard1;