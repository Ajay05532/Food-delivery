import Redis from "ioredis";

const redisClient = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.on("connect", () => {
  console.log("Connected to Redis gracefully!");
});

redisClient.on("ready", () => console.log("🚀 Redis Ready"));
redisClient.on("error", (err) => console.error("Redis Error:", err));
redisClient.on("close", () => console.warn("Redis connection closed"));

export const connectRedis = () => {
  console.log("Redis initialized");
};

export default redisClient;
