// server\controllers\userController.js
const express = require("express");
const router = express.Router();
const { TOKEN_COOKIE_NAME } = require("../config/constants");
const authServices = require("../services/authServices");
const { errorHandler } = require("../middlewares/errorHandler");
const { getUserById } = require("../services/authServices");
const { isAlreadyLogged, isAuth } = require("../middlewares/authMiddleware");

router.post("/login", isAlreadyLogged, async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "You must fill in both fields!" });
      return;
    }
    let user = await authServices.login(email, password);

    if (!user) {
      res.status(401).json({ error: "Invalid email or password!" });
    } else {
      let token = await authServices.createToken(user);

      res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: "lax"
      });
      res.json({
        user: email,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName
      });
    }
  } catch (error) {
    res.status(401).json({ error: errorHandler(error) });
  }
});

router.post("/register", isAlreadyLogged, async (req, res) => {
  let { firstName, lastName, email, password, rePassword } = req.body;

  email = email.toLowerCase();

  try {
    if (firstName && lastName) {
      firstName = firstName[0].toUpperCase() + firstName.substring(1).toLowerCase();

      lastName = lastName[0].toUpperCase() + lastName.substring(1).toLowerCase();
    }

    if (password !== rePassword) {
      res.status(401).json({ error: "Both passwords must be the same!" });
    } else {
      await authServices.register(firstName, lastName, email, password);
      let user = await authServices.login(email, password);
      let token = await authServices.createToken(user);

      res.cookie(TOKEN_COOKIE_NAME, token, {
        httpOnly: true
      });
      res.json({ user: email, id: user._id });
    }
  } catch (error) {
    res.status(401).json({ error: errorHandler(error) });
  }
});
router.get("/logout", isAuth, (req, res) => {
  try {
    res.clearCookie(TOKEN_COOKIE_NAME, { path: "/" });
    res.json("You have logged out successfully");
  } catch (error) {
    res.status(401).json({ error: errorHandler(error) });
  }
});

router.put("/profile/:id", isAuth, async (req, res) => {
  try {
    const { firstName, lastName, email, currentPassword, password } = req.body;
    const userId = req.params.id;

    let user = await authServices.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const isValidPassword = await user.validatePassword(currentPassword);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Current password is incorrect!" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = password;

    await user.save();

    res.json({ message: "Profile updated successfully." });
  } catch (error) {
    res.status(400).json({ error: errorHandler(error) });
  }
});

router.get("/profile/:id", isAuth, async (req, res) => {
  try {
    let userData = await getUserById(req.params.id);
    res.json({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      favorites: userData.favorites
    });
  } catch (error) {
    res.status(401).json({ error: errorHandler(error) });
  }
});
module.exports = router;
