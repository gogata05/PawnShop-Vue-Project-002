// server\index.js
require("dotenv").config(); // Зареждане на .env файловете
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

// Настройка на CORS с общ достъп
// app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cors({ credentials: true, origin: "https://pawn-shop-vue-project-002.vercel.app" }));
// app.use(cors({ credentials: true, origin: "*" }));

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

// Инициализиране на базата данни и стартиране на сървъра
initDatabase(process.env.DB_CONNECTION_STRING)
  .then(() => {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to connect to the database:", err);
  });

// Тестов маршрут
app.get("/", (req, res) => {
  res.json({ text: "Server is online!" });
});
