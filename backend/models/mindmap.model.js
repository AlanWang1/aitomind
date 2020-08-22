const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid");

const mindmapSchema = new Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    nodes: {
      type: Array,
      required: true,
    },
    connections: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MindMap", mindmapSchema);
