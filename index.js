// index.js
const express = require("express");
const bodyParser = require("body-parser");
const clothingRoutes1 = require("./routes/clothingRoutes_jums"); // Import the route file
const clothingRoutes2 = require("./routes/clothingRoutes_leila"); // Import the route file
const clothingRoutes3 = require("./routes/clothingRoutesCR"); // Import the route file

const app = express();
const PORT = process.env.PORT || 5051;
const startPage = "index.html";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./public"));

// Serve the index.html file at the root URL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/" + startPage);
});

// Use the clothing routes with the /api prefix
app.use("/api", clothingRoutes1); // Register the routes under /api
app.use("/api", clothingRoutes2); // Register the routes under /api
app.use("/api", clothingRoutes3); // Register the routes under /api

// Start the server
const server = app.listen(PORT, function () {
  const address = server.address();
  const baseUrl = `http://${
    address.address === "::" ? "localhost" : address.address
  }:${address.port}`;
  console.log(`Demo project at: ${baseUrl}`);
});

module.exports = { app, server };
