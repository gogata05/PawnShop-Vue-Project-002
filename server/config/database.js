// server\config\database.js
const mongoose = require("mongoose");

function initDatabase(connectionString) {
  return mongoose.connect(connectionString);
}

module.exports = initDatabase;
