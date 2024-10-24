// server\config\config.js
module.exports = {
  development: {
    PORT: process.env.PORT || 5000,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/pawnShop"
  }
};
