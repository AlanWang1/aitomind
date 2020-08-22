import React, { Component } from "react";
import FileUpload from "../components/FileUpload";
import Mindmap from "../components/Mindmap";
import "./mindmap.css";
import Video from "../components/Video";

export default class MindMapPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoPath: "",
    };
    this.handleUpload = this.handleUpload.bind(this);
  }
  handleUpload(path) {
    this.setState({ videoPath: path });
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
      <div className="columns" style={{paddingLeft:"5ch", paddingRight:"5ch"}}>
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
            <p className="column is-size-4 has-text-weight-bold"> Add a Node </p>
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
          <Mindmap />
        </div>
      </div>
    );
  }
}
