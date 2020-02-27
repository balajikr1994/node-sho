import redis from "redis";
import config from "../../config/environment";

const redisConnection = redis.createClient({
	host: config.redis.host,
	port: config.redis.port,
	password: config.redis.password
});

redisConnection.on("connect", function() {
	console.log("Redis client connected");
});

redisConnection.on("error", function(err) {
	console.log("Something went wrong " + JSON.stringify(err));
});

export default redisConnection;
