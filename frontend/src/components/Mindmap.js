import React, { Component } from "react";
import MindMap from "react-mindmap";


export default class Mindmap extends Component {
  render() {

    return (
        //has to be editable=false (default), or else will have moving issues
      <div>
        <MindMap nodes={this.props.nodes} connections={this.props.connections}/>
      </div>
    );
  }
}
