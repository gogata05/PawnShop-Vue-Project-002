// server\models\User.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "You must populate your first name!"],
    minlength: [2, "The first name should be at least 2 characters long and contains only English letters"],
    validate: {
      validator: function (v) {
        return /^[A-Z][a-z]*$/.test(v);
      },
      message: props => `${props.value} is not a valid name! Make sure that the name only contains English letters.`
    }
  },
  lastName: {
    type: String,
    required: [true, "You must populate your last name!"],
    minlength: [2, "The last name should be at least 2 characters long and contains only English letters"],
    validate: {
      validator: function (v) {
        return /^[A-Z][a-z]*$/.test(v);
      },
      message: props => `${props.value} is not a valid name! Make sure that the name only contains English letters.`
    }
  },
  email: {
    type: String,
    required: [true, "Email should not be empty!"],
    // match: [/^[a-z_\-.1-9]*@[a-z]*(\.[a-z]{2,3})$/, "Please fill a valid email address"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Password should not be empty!"],
    minLength: [6, "Password should be at least 6 characters long!"],
    validate: [/^[^ ]*$/, "Password cannot contain white spaces!"]
  },
  favorites: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Product"
    }
  ]
});

userSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next("Email is already taken!");
  } else {
    next(error);
  }
});
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt
    .hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

userSchema.method("validatePassword", function (password) {
  return bcrypt.compare(password, this.password);
});

userSchema.pre("find", function() {
  this.populate("favorites");
});

userSchema.pre("findOne", function() {
  this.populate("favorites");
});

const User = mongoose.model("User", userSchema);

module.exports = User;
