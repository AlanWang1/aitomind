import React, { Component } from "react";
import FileUpload from "../components/FileUpload";
import Mindmap from "../components/Mindmap";
import "./mindmap.css";
import Video from "../components/Video";
import axios from "axios";
import MindMapFetch from "../components/MindMapFetch";

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
    this.handleFieldChange = this.handleFieldChange.bind(this);
  }
  handleUpload(path) {
    this.setState({ videoPath: path });
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

  handleFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const container = {
      height: "60vh",
      display: "flex",
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
                <Video url={this.state.videoPath} />
              ) : (
                <FileUpload onUpload={this.handleUpload} />
              )}
            </div>
          </div>

          <div className="columns">
            <p className="column is-size-4 has-text-weight-bold">
              {" "}
              Add a Node{" "}
            </p>
          </div>

          <form>
            <div className="columns is-multiline ">
              <div className="column is-6">
                <label className="label has-text-weight-medium">Name</label>
                <div className="control">
                  <input
                    className="input is-small "
                    type="text"
                    placeholder="Text input"
                  />
                </div>
              </div>
              <div className="column is-6">
                <label className="label has-text-weight-medium">
                  Connections
                </label>
                <div className="control">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="Text input"
                  />
                </div>
              </div>
              <div className="column">
                <label className="label has-text-weight-medium">
                  Connections
                </label>
                <div className="control">
                  <input
                    className="input is-small"
                    type="text"
                    placeholder="Text input"
                  />
                </div>
              </div>
            </div>
            <button className="button is-primary is-pulled-right" type="submit">
              Add
            </button>
          </form>
        </div>
        <div className="column is-4 ">
          {(this.state.nodes.length !== 0 &&
          this.state.connections.length !== 0) ? (
            <Mindmap
              nodes={this.state.nodes}
              connections={this.state.connections}
            />
          ) : (
            <MindMapFetch onChange={this.handleFieldChange} onSubmit={this.handleMindMapFetch} />
          )}
          
        </div>
      </div>
    );
  }
}
