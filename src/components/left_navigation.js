import React, { Component } from 'react';
import Range_slider from './range_slider';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected_menu: 1
    }
    this.select1 = this.select1.bind(this);
    this.select2 = this.select2.bind(this);
  }

  select1() {
    this.setState({
      selected_menu: 1
    })
  }
  
  select2() {
    this.setState({
      selected_menu: 2
    })
  }

  render() {
    const selected_menu = this.state.selected_menu
    return (
      <div className="content-left">
        <div className="content-left-body">
          <div className={selected_menu===1 ? 'train-top active' : 'train-top'} onClick={this.select1}>
            <label className="switch-slider">
              <input type="checkbox" />
              <p className="slider round top-mode">
                <span className="left active">auto</span>
                <span className="right">manual</span>
              </p>
            </label>
            <h2><a className="train-top-title">Train A</a></h2>
            <div className={selected_menu === 1 ? 'train-sub active' : 'train-sub'}>
              <a className="train-subtitle" data-toggle="collapse" href="#chemical-dosage" role="button" aria-expanded="false" aria-controls="chemical-dosage">Chemical dosage</a>
              <div className="collapse multi-collapse" id="chemical-dosage">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>Demulsifier (PPM)</p>
                    <label className="switch-slider">
                      <input type="checkbox" />
                      <p className="slider round">
                        <span className="left active">auto</span>
                        <span className="right">manual</span>
                      </p>
                    </label>
                    <Range_slider value={[20]} max_value={30}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 1 ? 'train-sub active' : 'train-sub'}>
              <a className="train-subtitle" data-toggle="collapse" href="#flow" role="button" aria-expanded="false" aria-controls="flow">Flow rate</a>
              <div className="collapse multi-collapse" id="flow">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>FT-195A Flow Rate (m3/hr)</p>
                    <Range_slider value={[26]} max_value={30}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>FT-195B Flow Rate (m3/hr)</p>
                    <Range_slider value={[26]} max_value={30}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 1 ? 'train-sub active' : 'train-sub'}>
              <a className="train-subtitle" data-toggle="collapse" href="#Normal" role="button" aria-expanded="false" aria-controls="Normal">Normal simulation</a>
              <div className="collapse multi-collapse" id="Normal">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>Emulsion % at HX220B </p>
                    <Range_slider value={[40]} max_value={60}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>Water % at HX220B</p>
                    <Range_slider value={[34]} max_value={37}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 1 ? 'train-sub active' : 'train-sub'}>
              <a className="train-subtitle" data-toggle="collapse" href="#Heat" role="button" aria-expanded="false" aria-controls="Heat">Heat exchange simulation</a>
              <div className="collapse multi-collapse" id="Heat">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>HX220A Outlet Temperature (°C)</p>
                    <Range_slider value={[28]} max_value={30}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>HX220B Outlet Temperature (°C)</p>
                    <Range_slider value={[64]} max_value={80}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 1 ? 'train-sub active' : 'train-sub'}>
              <a className="train-subtitle" data-toggle="collapse" href="#Seperator" role="button" aria-expanded="false" aria-controls="Seperator">Seperator simulation</a>
              <div className="collapse multi-collapse" id="Seperator">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>V230A Separator Temperature (°C)</p>
                    <Range_slider value={[46]} max_value={70}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>V230A Separator Pressure (kPa)</p>
                    <Range_slider value={[45]} max_value={70}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={this.state.selected_menu === 2 ? 'train-top active' : 'train-top '} onClick={this.select2}>
            <h2><a className="train-bottom-title">Train B</a></h2>
            <div className={selected_menu === 2 ? 'train-sub1 active' : 'train-sub1'}>
              <a className="train-subtitle" data-toggle="collapse" href="#abc" role="button" aria-expanded="false" aria-controls="abc">Chemical dosage</a>
              <div className="collapse multi-collapse" id="abc">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>Demulsifier (PPM)</p>
                    <Range_slider value={[75]} max_value={100}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 2 ? 'train-sub1 active' : 'train-sub1'}>
              <a className="train-subtitle" data-toggle="collapse" href="#efg" role="button" aria-expanded="false" aria-controls="efg">Flow rate</a>
              <div className="collapse multi-collapse" id="efg">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>FT-195C Flow Rate (m3/hr)</p>
                    <Range_slider value={[74]} max_value={100}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>FT-195D Flow Rate (m3/hr)</p>
                    <Range_slider value={[74]} max_value={100}/>
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 2 ? 'train-sub1 active' : 'train-sub1'}>
              <a className="train-subtitle" data-toggle="collapse" href="#abcde" role="button" aria-expanded="false" aria-controls="abcde">Normal simulation</a>
              <div className="collapse multi-collapse" id="abcde">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>Emulsion % at HX 220D </p>
                    <Range_slider value={[55]} max_value={80}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>Water % at HX 220D</p>
                    <Range_slider value={[35]} max_value={80} />
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 2 ? 'train-sub1 active' : 'train-sub1'}>
              <a className="train-subtitle" data-toggle="collapse" href="#bcde" role="button" aria-expanded="false" aria-controls="bcde">Heat exchange simulation</a>
              <div className="collapse multi-collapse" id="bcde">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>HX220C Inlet Temperature (°C)</p>
                    <Range_slider value={[15]} max_value={60}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>HX220C Outlet Temperature (°C)</p>
                    <Range_slider value={[45]} max_value={60} />
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>HX220C Outlet Pressure</p>
                    <Range_slider value={[15]} max_value={60}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>HX220D Inlet Temperature (°C)</p>
                    <Range_slider value={[45]} max_value={60} />
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>HX220D Outlet Temperature (°C)</p>
                    <Range_slider value={[15]} max_value={60}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>HX220D Outlet Pressure (kPa)</p>
                    <Range_slider value={[45]} max_value={60} />
                  </div>
                </div>
              </div>
            </div>
            <div className={selected_menu === 2 ? 'train-sub1 active' : 'train-sub1'}>
              <a className="train-subtitle" data-toggle="collapse" href="#efgh" role="button" aria-expanded="false" aria-controls="efgh">Seperator simulation</a>
              <div className="collapse multi-collapse" id="efgh">
                <div className="range-box">
                  <div className="card train-top-text">
                    <p>V230B Separator Temperature (°C)</p>
                    <Range_slider value={[42]} max_value={60}/>
                  </div>
                  <hr />
                  <div className="card train-top-text">
                    <p>V220B Separator Pressure (kPa)</p>
                    <Range_slider value={[35]} max_value={60}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
