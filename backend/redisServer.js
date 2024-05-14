const { Redis } = require('ioredis');
const redis = new Redis({
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  family: 4,
});

redis.on('connect', () => {
  console.error('Connected to redis');
});

redis.on('ready', () => {
  console.error('Connected to redis ready to use');
});

redis.on('error', err => {
  console.error('Redis connection error:', err);
});

module.exports = redis;
