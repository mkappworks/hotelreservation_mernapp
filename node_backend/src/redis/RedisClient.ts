import redis from "redis";
require("dotenv/config");

//connect to redis
const redisClient = redis.createClient(
  process.env.REDIS_PORT as unknown as number,
  process.env.REDIS_HOST
);

redisClient.on("Connect", () => {
  console.log("redis client connected");
});

export default redisClient;

// const redis = require('redis')

// const client = redis.createClient({
//   port: 6379,
//   host: '127.0.0.1',
// })

// client.on('connect', () => {
//   console.log('Client connected to redis...')
// })

// client.on('ready', () => {
//   console.log('Client connected to redis and ready to use...')
// })

// client.on('error', (err) => {
//   console.log(err.message)
// })

// client.on('end', () => {
//   console.log('Client disconnected from redis')
// })

// process.on('SIGINT', () => {
//   client.quit()
// })

// module.exports = client
