// index.js
const express = require("express");
const bodyParser = require("body-parser");
const clothingRoutes1 = require("./routes/clothingRoutes_jums"); // Import the route file
const clothingRoutes2 = require("./routes/clothingRoutes_leila"); // Import the route file
const clothingRoutes3 = require("./routes/clothingRoutesCR1"); // Import the route file
const clothingRoutes4 = require("./routes/clothingRoutesCR2"); // Import the route file

const app = express();
const PORT = process.env.PORT || 5050;
const startPage = "index.html";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./instrumented"));

// Serve the index.html file at the root URL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/instrumented/" + startPage);
});

app.post("/add-clothing", clothingRoutes1);
app.put("/update-clothing/:id", clothingRoutes2);
app.get("/get-clothing", clothingRoutes3);
app.get("/get-clothing/:id", clothingRoutes4);

// Start the server
const server = app.listen(PORT, function () {
  const address = server.address();
  const baseUrl = `http://${
    address.address === "::" ? "localhost" : address.address
  }:${address.port}`;
  console.log(`Demo project at: ${baseUrl}`);
});

module.exports = { app, server };
