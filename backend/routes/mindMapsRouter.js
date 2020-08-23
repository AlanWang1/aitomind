const router = require("express").Router();
const MindMap = require("../models/mindmap.model");


// Get all Mindmaps
router.get("/mindmaps", async (req, res) => {
  try {
    const mindmaps = await MindMap.find();
    Test(res, mindmaps);
  } catch (err) {
    res.status(400).json(" Error" + err);
  }
});

// Create Mindmap
router.post("/mindmaps/add", async (req, res) => {
  const nodes = req.body.nodes;
  const connections = req.body.connections;
  const newMindMap = new MindMap({
    nodes,
    connections, 
  });
  try {
    await newMindMap.save();
  } catch (err) {
    res.status(400).json(" Error" + err);
  }
});

// Get Mindmap by ID
router.get("/mindmaps/:id", async (req, res) => {
  try {
    const mindmaps = await MindMap.findById(req.params.id);
    res.json(mindmaps);
  } catch (err) {
    res.status(400).json(" Error" + err);
  }
});

// Delete Mindmap
router.delete("/mindmaps/:id", async (req, res) => {
  try {
    await MindMap.findByIDAndDelete(req.params.id);
    res.json("Post Deleted");
  } catch (err) {
    res.status(400).json(" Error" + err);
  }
});

// Update Mindmap
router.post("/mindmaps/update/:id", async (req, res) => {
  try {
    const mindmap = await MindMap.findById(req.params.id);
    mindmap.nodes = req.body.nodes;
    mindmap.connections = req.body.connections;
    try {
      await mindmap.save();
      res.json("Mindmap Updated");
    } catch (err) {
      res.status(400).json(" Error" + err);
    }
  } catch (err) {
    res.status(400).json(" Error" + err);
  }
});

module.exports = router;
