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
  }

  handleUpload(path, nodes, connections) {
    let newNodes = [];
    let newConnections = [];
    for (let i = 0; i < nodes.length; i++) {
      newNodes[i] = {
        text: nodes[i].text + " " + nodes[i].timestamp,
      };
    }
    for (let i = 0; i < connections.length; i++) {
      newConnections[i] = {
        source: connections[i].source + " " + connections[i].sourceTimeStamp,
        target: connections[i].target + " " + connections[i].targetTimeStamp
      };
    }
    this.setState({ videoPath: path, nodes: newNodes, connections: newConnections });
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

  render() {
    const container = {
      height: "60vh",
      display: "flex",
      marginTop: "10vh",
    };
    const videoArea = {
      alignSelf: "center",
    };
    const mindMap = {
      textAlign: "center",
      display: "flex",
    };
    return (
      <div
        className="columns"
        style={{ paddingLeft: "5ch", paddingRight: "5ch" }}
      >
        <div className="column is-8">
          <div className="columns is-centered" style={container}>
            <div className="columns is-centered" style={videoArea}>
              {this.state.videoPath ? (
                <div className="column">
                  <Video url={this.state.videoPath} />
                </div>
              ) : (
                <div className="column">
                  <FileUpload onUpload={this.handleUpload} />
                </div>
              )}
            </div>
          </div>
          {/* <MindMapUpdateForm onUpdate={this.handleMindMapUpdate} />*/}
          {/*have to import if want to use again */}
        </div>
        <div className="is-divider-vertical"></div>

        <div className="column is-4 columns is-centered" style={mindMap}>
          {this.state.nodes.length !== 0 ||
          this.state.connections.length !== 0 ? (
            <Mindmap
              nodes={this.state.nodes}
              connections={this.state.connections}
            />
          ) : (
            <div
              style={{
                alignSelf: "center",
                justifySelf: "center",
              }}
            >
              <img
                src="\img\Books.svg"
                style={{
                  width: "120%",
                  height: "auto",
                  marginBottom: "2ch",
                }}
                className="column"
              ></img>
              <div className="columns">
                <p className=" column"> Your Mindmap will Appear Here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
