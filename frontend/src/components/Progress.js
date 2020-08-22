import React from "react";

const Progress = (props) => {
  return (
    <div>
      <progress
        className="progress is-primary"
        value={`${props.percentage}`}
        max="100"
      ></progress>
    </div>
  );
};

export default Progress;
