import React, { Component } from 'react';
import Slider from 'react-compound-slider'
import { Handle, Track } from './slider_comp'

const sliderStyle = {
    position: 'relative',
    width: '80%',
}
const railStyle = {
    position: 'absolute',
    width: '100%',
    height: 14,
    borderRadius: 7,
    cursor: 'pointer',
    backgroundColor: '#e0e1e2',
}


class App extends Component {
    state = {
        values: this.props.value
    }
    onUpdate = values => {
        this.setState({ values })
    }
    render(){
        const domain = [0, this.props.max_value]
        const { state: { values } } = this
        return (
            <div className="range-slider">
                <Slider
                    mode={1}
                    step={1}
                    domain={domain}
                    rootStyle={sliderStyle}
                    onUpdate={this.onUpdate}
                    values={values}
                >
                    <Slider.Rail>
                        {({ getRailProps }) => (
                            <div style={railStyle} {...getRailProps()} />
                        )}
                    </Slider.Rail>
                    <Slider.Handles>
                        {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        domain={domain}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Slider.Handles>
                    <Slider.Tracks right={false}>
                        {({ tracks, getTrackProps }) => (
                            <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                    <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Slider.Tracks>
                </Slider>
                <span className="slider_value">{this.state.values}</span>
            </div>
        )
    }
}

export default App;