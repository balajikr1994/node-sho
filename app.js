"use strict";
require("dotenv").config();
const path = require("path");
import express from "express";
import http from "http";

import expressConfig from "./config/express";
import routerConfig from "./routes";
import config from "./config/environment";
import passport from "passport";
import seedDataBaseIfNeeded from "./config/seed";
import { mongoDBConnection } from "./db/mongodb";
import redisConnection from "./db/redis";

const app = express(),
	DIST_DIR = __dirname,
	HTML_FILE = path.join(DIST_DIR, "index.html");
const server = http.createServer(app);
const multipart = require("connect-multiparty");

app.get("/", (req, res) => {
	res.sendFile(HTML_FILE);
});

app.use(
	multipart({
		uploadDir: config.tmp
	})
);
app.use(passport.initialize());
app.use(passport.session());

mongoDBConnection();
Promise.resolve(redisConnection);
expressConfig(app);
routerConfig(app);
seedDataBaseIfNeeded();

function startServer() {
	server.listen(process.env.PORT, config.ip, () => {
		console.log("Express server listening on ", server.address().port);
	});
}

setImmediate(startServer);
