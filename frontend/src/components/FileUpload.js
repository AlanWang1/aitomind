import React, { Fragment, useState } from "react";
import Progress from "./Progress";
import axios from "axios";

const FileUpload = (props) => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("");
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
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

      const { fileName, filePath } = res.data;
      //has to be before setState
      props.onUpload(filePath);
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log(err);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <div className="columns">
          <div className="file has-name is-boxed">
            <label className="file-label">
              <input className="file-input" type="file" onChange={onChange} />
              <span className="file-cta is-primary">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span class="file-label">Upload a File... </span>
              </span>
              <span class="file-name"> {filename} </span>
            </label>
          </div>
        </div>
        <div className="columns is-centered" style={{padding:"2ch 0ch"}}>
          <button className="button is-primary" type="submit">
            Upload
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default FileUpload;
