// var express = require("express");
// var bodyParser = require("body-parser");
// var app = express();

// const PORT = process.env.PORT || 5050;
// var startPage = "index.html";

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/public/" + startPage);
// });

// server = app.listen(PORT, function () {
//   const address = server.address();
//   const baseUrl = `http://${
//     address.address == "::" ? "localhost" : address.address
//   }:${address.port}`;
//   console.log(`Demo project at: ${baseUrl}`);
// });

// module.exports = { app, server };


// index.js
const express = require("express");
const bodyParser = require("body-parser");
const clothingRoutes = require("./routes/clothingRoutes"); // Import the route file

const app = express();
const PORT = process.env.PORT || 5050;
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
app.use("/api", clothingRoutes); // Register the routes under /api

// Start the server
const server = app.listen(PORT, function () {
  const address = server.address();
  const baseUrl = `http://${address.address === "::" ? "localhost" : address.address}:${address.port}`;
  console.log(`Demo project at: ${baseUrl}`);
});

module.exports = { app, server };
