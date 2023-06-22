import React, { Component } from "react";

export default class MindMapUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      timestamp: "",
      connections: "",
    };
    this.updateChange = this.updateChange.bind(this);
  }

  updateChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  sendUpdate(e) {
    const node = {
      text: `${this.state.name} ${this.state.timestamp}`,
    };
    const outbound = this.state.connections.split(", ");
    const connections = [];
  }
  render() {
    return (
      <div>
        <div className="columns">
          <p className="column is-size-4 has-text-weight-bold"> </p>
        </div>

        <form onSubmit={this.sendUpdate}>
          <div className="columns is-multiline ">
            <div className="column is-9">
              <label className="label has-text-weight-medium">Name</label>
              <div className="control">
                <input
                  className="input is-small "
                  type="text"
                  placeholder="Text input"
                  name="name"
                  onChange={this.updateChange}
                />
              </div>
            </div>
            <div className="column is-3">
              <label className="label has-text-weight-medium">Timestamp</label>
              <div className="control">
                <input
                  className="input is-small"
                  type="text"
                  name="timestamp"
                  onChange={this.updateChange}
                />
              </div>
            </div>

            <div className="column ">
              <label className="label has-text-weight-medium">
                Connections
              </label>
              <div className="control">
                <input
                  type="text"
                  className="input is-small"
                  name="connections"
                  onChange={this.updateChange}
                />
              </div>
              <label className="label is-size-7 has-text-weight-medium">
                Format: Name 1, Name 2, Name 3 ... etc.
              </label>
            </div>
          </div>
          <button className="button is-primary is-pulled-right" type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}
