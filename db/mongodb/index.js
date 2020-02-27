import mongoose from "mongoose";
import config from "../../config/environment";

export const mongoDBConnection = () => {
	mongoose.connect(config.mongo.uri, config.mongo.options).then(() => {
		console.log("MongoDB Connected!!!");
		return Promise.resolve({});
	});
	mongoose.connection.on("error", err => {
		console.log("Error:::", err);
		process.exit(-1);
	});
};
