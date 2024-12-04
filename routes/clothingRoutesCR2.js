const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Path to resource.json
const dataPath = path.join(__dirname, "../utils/resource.json");

// GET route to retrieve a clothing item by ID
router.get("/get-clothing/:id", (req, res) => {
  const itemId = req.params.id;

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading resource.json:", err);
      return res.status(500).json({ message: "Server error" });
    }

    try {
      const items = JSON.parse(data) || [];
      const item = items.find((i) => i.id === itemId); // Find item by ID

      if (item) {
        res.status(200).json(item); // Return the found item as JSON
      } else {
        res.status(404).json({ message: "Item not found" }); // Return 404 if not found
      }
    } catch (parseError) {
      console.error("Error parsing resource.json:", parseError);
      res.status(500).json({ message: "Data parsing error" });
    }
  });
});

module.exports = router;
