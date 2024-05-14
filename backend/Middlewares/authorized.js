const jwt = require('jsonwebtoken');
const User = require('./../Models/UserModel');
exports.authenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.SECRET, async (err, decode) => {
        if (err) {
          return res.status(400).json({
            message: 'please login and try again',
          });
        }
        req.user = await User.findById(decode.id);
        next();
      });
    } else {
      return res.status(400).json({
        message: 'please login and try again',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.adminAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user.role.includes(roles)) {
      return res.status(400).json({
        message: 'You are not admin ',
      });
    }
    next();
  };
};
