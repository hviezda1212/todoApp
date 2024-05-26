const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  return obj;
};

userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this.id }, JWT_SECRET_KEY, { expiresIn: '1d' });
  return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
