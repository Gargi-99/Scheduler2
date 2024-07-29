const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

require("./connection/conn");
const auth = require("./routes/auth");
const list = require("./routes/list");

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
const PORT = 3001; // Hardcoded port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;

