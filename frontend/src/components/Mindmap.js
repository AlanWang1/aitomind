import React, { Component } from "react";
import MindMap from "react-mindmap";
import map from './map';

export default class Mindmap extends Component {
  render() {
    const style = {
        borderWidth: "2px 2px 2px 2px",
        borderColor:"grey",
        borderStyle: "solid",
        fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif"
    }
    return (
        //has to be editable=false (default), or else will have moving issues
      <div style={style}>
        <MindMap nodes={map.nodes} connections={map.connections}/>
      </div>
    );
  }
}
