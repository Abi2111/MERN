const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT || 8000;

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose.connect(DB).then(conn => {
  console.log('Connected to DB');
});

app.listen(PORT, () => {
  console.log('Server started...⭐', PORT);
});
