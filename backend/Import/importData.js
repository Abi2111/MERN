const mongoose = require('mongoose');
const Product = require('./../Models/ProductModel');
const dotenv = require('dotenv');
require('./../../');
dotenv.config({ path: './../../config.env' });

const fs = require('fs');

const data = fs.readFileSync('./products.json', 'utf-8');

const importData = async () => {
  try {
    const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
    mongoose.connect(DB).then(conn => {
      console.log('Connected to DB');
    });
    await Product.deleteMany();
    await Product.insertMany(JSON.parse(data));
    console.log('Imported data');
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

importData();
