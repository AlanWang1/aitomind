import React from 'react'

export default function MindMapFetch(props) {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
            <label className="label has-text-weight-medium">
              Fetch a Mindmap
            </label>
            <div className="control">
              <input
                className="input is-small"
                type="text"
                name="id"
                placeholder="Text input"
                onChange={props.onChange}
              />
              <button
                className="button is-primary is-pulled-right"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
    )
}

