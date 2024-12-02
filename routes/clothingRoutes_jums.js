const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Path to resource.json
const dataPath = path.join(__dirname, "../utils/resource.json");

// Existing POST route to add a new clothing item
router.post("/add-clothing", (req, res) => {
  const { name, size, color, material } = req.body;

  if (!name || !size || !color || !material) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const id = Date.now().toString();
  const newClothing = { id, name, size, color, material };

  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading resource.json:", err);
      return res.status(500).json({ message: "Server error" });
    }

    let clothingData = data ? JSON.parse(data) : [];
    clothingData.push(newClothing);

    fs.writeFile(dataPath, JSON.stringify(clothingData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to resource.json:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.status(201).json({ message: "Clothing item added successfully!" });
    });
  });
});

// Add a clothing item
router.post("/add-clothing", (req, res) => {
  const item = req.body;
  item.id = Date.now().toString();
  clothingItems.push(item);
  res.status(200).json({ message: "Clothing item added successfully!" });
});

module.exports = router;
