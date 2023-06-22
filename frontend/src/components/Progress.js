import React from "react";

const Progress = (props) => {
  return (
    <div>
      <progress
        className="test progress"
        value={`${props.percentage}`}
        max="100"
        style={{
          background: "rgb(2,0,36)",
          background:
            " linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(249,150,81,1) 0%, rgba(247,39,88,1) 69%)",
        }}
      ></progress>
    </div>
  );
};

export default Progress;
