const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [50, 'your name cannot exceed 50 characters'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter your email'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your name'],
      maxLength: [30, 'Password should be less than 30 characters'],
      minLength: [5, 'Password should be greater than 5 characters'],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: 'user',
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
