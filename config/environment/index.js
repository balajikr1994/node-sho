"use strict";

require("dotenv").config();

import _ from "lodash";

let all = {
	ip: process.env.IP || "0.0.0.0",
	port: process.env.PORT,
	tmp: process.env.TMP || "/tmp",
	auth: {
		id: process.env.PROJECT_ID || 1324,
		clientId: process.env.CLIENT_ID || "GUDSHO_CLIENT_SECRET",
		clientSecret:
			process.env.CLIENT_SECRET || "GUDSHO_CLIENT_SECRET",
		url: "http://localhost:" + process.env.PORT + "/v1/auth/token"
	},
	secrets: {
		accessToken: process.env.ACCESS_TOKEN_SECRET || "my_access_token",
		refreshToken: process.env.REFRESH_TOKEN_SECRET || "my_refresh_token"
	},
	s3FileUpload: {
		expiresInMinutes: 60 * 15,
		keyId: process.env.S3_KEY_ID,
		secret: process.env.S3_SECRET,
		bucket: process.env.S3_BUCKET,
		region: process.env.S3_REGION
	},
	token: {
		expiresInMinutes: 300
	},
	seedDB: false,
	// MongoDB connection options
	mongo: {
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	},
	// Redis Connection
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD
	}
};

//MERGED THE FILES EASILY TO HANDLE USING WITH CONFIG
const mergeObj = _.merge(all, require(`./${process.env.NODE_ENV}`));

export default mergeObj;
