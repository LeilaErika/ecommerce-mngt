const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Path to resource.json
const dataPath = path.join(__dirname, "../utils/resource.json");

// GET route to retrieve all clothing items
router.get("/get-clothing", (req, res) => {
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading resource.json:", err);
      return res.status(500).json({ message: "Server error" });
    }

    try {
      // Parse and send the JSON data, defaulting to an empty array if empty
      res.status(200).json(data ? JSON.parse(data) : []);
    } catch (parseError) {
      console.error("Error parsing resource.json:", parseError);
      res.status(500).json({ message: "Data parsing error" });
    }
  });
});

module.exports = router;
