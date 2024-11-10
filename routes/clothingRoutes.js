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

// Update route to modify an existing clothing item
router.put("/update-clothing/:id", (req, res) => {
  const { id } = req.params; // Retrieve ID from route parameters
  const { name, size, color, material } = req.body;

  if (!name || !size || !color || !material) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // Read the existing data
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading resource.json:", err);
      return res.status(500).json({ message: "Server error" });
    }

    let clothingData;
    try {
      clothingData = data ? JSON.parse(data) : [];
    } catch (parseError) {
      console.error("Error parsing resource.json:", parseError);
      return res.status(500).json({ message: "Data parsing error" });
    }

    // Find the index of the item to be updated
    const itemIndex = clothingData.findIndex((item) => item.id === id);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Clothing item not found!" });
    }

    // Update the item
    clothingData[itemIndex] = { id, name, size, color, material };

    // Write the updated data back to the file
    fs.writeFile(dataPath, JSON.stringify(clothingData, null, 2), (err) => {
      if (err) {
        console.error("Error writing to resource.json:", err);
        return res.status(500).json({ message: "Server error" });
      }
      res.status(200).json({ message: "Clothing item updated successfully!" });
    });
  });
});

module.exports = router;
