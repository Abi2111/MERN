const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: './../config.env' });
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_API_KEY,
  api_secret: process.env.CLOUDNARY_SECRET,
});
module.exports = cloudinary;
