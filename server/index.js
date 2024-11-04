// server\index.js
require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const initDatabase = require("./config/database");
const { auth } = require("./middlewares/authMiddleware");
const orderController = require("./controllers/orderController");
const { seedDatabase } = require("./config/seedData");

const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());

// CORS settings
// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));//for local
app.use(cors({ credentials: true, origin: "https://pawn-shop-vue-project-002.vercel.app" })); //for vercel
// app.use(cors({ credentials: true, origin: "*" }));//for all

// Routes
app.use(auth);
app.use(routes);
app.use("/orders", orderController);

// Route for seeding database
app.post("/seed", async (req, res) => {
  try {
    const result = await seedDatabase();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to seed database" });
  }
});

// Database initialization and server start
initDatabase(process.env.DB_CONNECTION_STRING)
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to the database:", err);
  });

// Test route
app.get("/", (req, res) => {
  res.json({ text: "Server is online!" });
});
