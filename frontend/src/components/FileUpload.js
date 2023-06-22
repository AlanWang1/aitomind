import React, { Fragment, useState } from "react";
import axios from "axios";
import Progress from "./Progress";

const FileUpload = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    setIsUploading(true);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      const { fileName, filePath, nodes, connections } = res.data;
      //should become const {fileName, filePath, nodes, connections}=res.data;
      console.log(res.data);
      //has to be before setState
      props.onUpload(filePath, nodes, connections);
      //function will have additional stuff for setting mind map state
      setUploadedFile({ fileName, filePath });
      setIsUploading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="columns">
          <div className="file has-name is-boxed is-large">
            <label className="file-label">
              <input className="file-input" type="file" onChange={onChange} />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Upload a Video</span>
              </span>
              <span className="file-name">{filename}</span>
            </label>
          </div>
        </div>

        {isUploading ? (
          <div
            className="columns"
            style={{
              padding: "2ch 0ch",
            }}
          >
            {" "}
            <div
              className="column"
              style={{
                textAlign: "center",
              }}
            >
              <button className="button is-primary is-loading">Upload</button>
              <p>Processing Your Video...</p>
            </div>
          </div>
        ) : (
          <div
            className="columns"
            style={{
              padding: "2ch 0ch",
            }}
          >
            {" "}
            <div
              className="column"
              style={{
                textAlign: "center",
              }}
            >
              <button className="button is-primary" type="submit">
                Upload
              </button>
            </div>
          </div>
        )}
      </form>

      {/*isUploading ? (
        <div className="columns">
          {" "}
          <div className="column" style={
            {
              textAlign:"center"
            }
          }>
            <Progress percentage={uploadPercentage} />
            <p>Processing Your Video...</p>
          </div>
        </div>
      ) : null */}
    </div>
  );
};

export default FileUpload;
