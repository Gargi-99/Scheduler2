const express = require("express");
const app = express();
const cors = require("cors");
require("./connection/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");
const path = require("path");

app.use(express.json());
app.use(cors());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'frontend', 'build')));

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Handles any other routes and serves the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Start the server
app.listen(3001, () => {
  console.log("Server started on port 3001");
});

