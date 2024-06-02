const express = require('express');
const app = express();
const errorMiddleware = require('./Utils/Errors');
const userRouter = require('./Routes/userRoutes');
const cookieParser = require('cookie-parser');
const productsRouter = require('./Routes/productsRoutes');
const orderRouter = require('./Routes/orderRoutes');
const cartRouter = require('./Routes/cartRoutes');
const dotEnv = require('dotenv');
dotEnv.config({ path: './../config.env' });

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
process.on('uncaughtException', err => {
  console.log('Error 💥', err);
  console.log('shut dowing the sever');
  process.exit(1);
});
app.use(cookieParser());
app.use('/api/v1', productsRouter);
app.use('/api/v1', cartRouter);
app.use('/api/v1', orderRouter);
app.use('/api/v1', userRouter);

app.use(errorMiddleware);
module.exports = app;
