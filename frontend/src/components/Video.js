import React, { Component } from 'react'
import ReactPlayer from 'react-player/';

export default class Video extends Component {
    render() {
        return (
            <div>
                {/*html video tag don't work for some reason */}
                <ReactPlayer controls={true} url={this.props.url} width="60vw" height="70vh"/>
            </div>
        )
    }
}
