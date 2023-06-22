const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const processvideo = require("./videoprocess");
require("dotenv").config();
const path = require("path");
const videoprocess = require("./videoprocess");

//require transcribe

// set up express and middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// set up routes
app.use("/api", require("./routes/mindMapsRouter"));

app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`../frontend/public/uploads/${file.name}`, (err) => {
    //executes once video file moved

    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    videoprocess(
      `../frontend/public/uploads/${file.name}`,
      file.name,
      `/uploads/${file.name}`,
      res
    ); //should start extracting video audio once file has been moved
    // transcribe(`path.join('./files/'), path.basename(${file.name}, path.extname(${file.name})) + ".wav"`);
    //setTimeout(function(){res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });},10000);

    //transcribe(`../frontend/public/uploads/${file.name}`);
  });

  /* (async () => {
    let response = await transcribe(`../frontend/public/uploads/${file.name}`);
    let text = await response;
    console.log(text);
  })(); */
});

// set up mongoose
console.log("Connecting to MongoDB");
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    //NewUrlParser and UnifiedTopology are new features that are not enabled by default
    if (err) {
      return console.error(err);
    }
    console.log("MongoDB connection established");
  }
);
