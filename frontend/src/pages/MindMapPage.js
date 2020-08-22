import React, { Component } from "react";
import FileUpload from "../components/FileUpload";
import Mindmap from "../components/Mindmap";
import "./mindmap.css";
import Video from "../components/Video";
import axios from "axios";


export default class MindMapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPath: "",
      nodes: [],
      connections: [],
      id: "",
    };
    this.handleUpload = this.handleUpload.bind(this);
    this.handleMindMapFetch = this.handleMindMapFetch.bind(this);
    this.handleFetchFieldChange = this.handleFetchFieldChange.bind(this);
    this.handleMindMapUpdate = this.handleMindMapUpdate.bind(this);
  }

  handleUpload(path) {
    this.setState({ videoPath: path });
    //set state nodes and connections from what was passed in (will have new parameters)
  }

  async handleMindMapFetch(e) {
    e.preventDefault();
    const id = this.state.id;
    console.log(id);
    const response = await axios.get(
      `http://localhost:5000/api/mindmaps/${id}`
    );
    console.log(response);
    this.setState({
      nodes: response.data.nodes,
      connections: response.data.connections,
    });
  }

  //unused because no text fields (fetching or otherwise)
  handleFetchFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  //unused because no mindmap updating
  handleMindMapUpdate(node, connections){
   
  }

  render() {
    const container = {
      height: "60vh",
      display: "flex",
      marginTop:"10vh"
    };
    const videoArea = {
      alignSelf: "center",
    };
    return (
      <div
        className="columns"
        style={{ paddingLeft: "5ch", paddingRight: "5ch" }}
      >
        <div className="column is-8">
          <div className="columns is-centered" style={container}>
            <div className="column columns is-centered" style={videoArea}>
              {this.state.videoPath ? (
                <div className="column">
                   <Video url={this.state.videoPath} />
                </div>
              ) : (
        
                <FileUpload onUpload={this.handleUpload} />
               
              )} 
            </div>
          </div>
       {/* <MindMapUpdateForm onUpdate={this.handleMindMapUpdate} />*/}
        {/*have to import if want to use again */}
        </div>
        <div className="column is-4 ">
          {(this.state.nodes.length !== 0 &&
          this.state.connections.length !== 0) ? (
            <Mindmap
              nodes={this.state.nodes}
              connections={this.state.connections}
            />
          ) : (
            <div>
             {/*MindMapFetchForm onChange={this.handleFetchFieldChange} onSubmit={this.handleMindMapFetch} />*/}
             {/*Have to import if want to use again*/}
             Your mindmap will appear here
            </div>
          )}
          
        </div>
      </div>
    );
  }
}
