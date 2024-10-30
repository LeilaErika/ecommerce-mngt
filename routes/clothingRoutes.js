// // routes/clothingRoutes.js
// const express = require('express');
// const router = express.Router();

// // POST route to add a new clothing item
// router.post('/add-clothing', (req, res) => {
//     const { name, size, color, material } = req.body;

//     // Validate required fields
//     if (!name || !size || !color || !material) {
//         return res.status(400).json({ message: 'All fields are required!' });
//     }

//     // Here we simply respond with a success message for testing
//     // In a real application, you might save this data to a database.
//     res.status(201).json({ message: 'Clothing item added successfully!' });
// });

// module.exports = router;


// routes/clothingRoutes.js



// routes/clothingRoutes.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Path to resource.json
const dataPath = path.join(__dirname, '../utils/resource.json');

// GET route to retrieve all clothing items
router.get('/get-clothing', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading resource.json:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // Parse and send the JSON data, defaulting to an empty array if empty
        res.status(200).json(data ? JSON.parse(data) : []);
    });
});

// Existing POST route to add a new clothing item
router.post('/add-clothing', (req, res) => {
    const { name, size, color, material } = req.body;

    if (!name || !size || !color || !material) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    const newClothing = { name, size, color, material };

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading resource.json:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        let clothingData = data ? JSON.parse(data) : [];
        clothingData.push(newClothing);

        fs.writeFile(dataPath, JSON.stringify(clothingData, null, 2), (err) => {
            if (err) {
                console.error('Error writing to resource.json:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            res.status(201).json({ message: 'Clothing item added successfully!' });
        });
    });
});

module.exports = router;
