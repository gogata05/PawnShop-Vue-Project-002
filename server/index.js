// server\index.js
require("dotenv").config(); // Добавете това
const cookieParser = require("cookie-parser");
const config = require("./config/config")[process.env.NODE_ENV];
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const initDatabase = require("./config/database");
const { auth } = require("./middlewares/authMiddleware");
const orderController = require("./controllers/orderController");
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(auth);
app.use(routes);
app.use("/orders", orderController);

initDatabase(process.env.DB_CONNECTION_STRING) // Променете тук
  .then(() => {
    app.listen(process.env.PORT, console.log(`Listening at http://localhost:${process.env.PORT}`)); // Променете тук
  })
  .catch(err => {
    console.error(err);
  });

app.get("/", (req, res) => {
  res.json({ text: "Server is online!" });
});
