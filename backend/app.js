const express = require('express');
const app = express();
const errorMiddleware = require('./Utils/Errors');
const userRouter = require('./Routes/userRoutes');
const cookieParser = require('cookie-parser');
const productsRouter = require('./Routes/productsRoutes');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
process.on('uncaughtException', err => {
  console.log('Error 💥', err);
  console.log('shut dowing the sever');
  process.exit(1);
});
app.use(cookieParser());
app.use('/api/v1', userRouter);
app.use('/api/v1', productsRouter);

app.use(errorMiddleware);
module.exports = app;
