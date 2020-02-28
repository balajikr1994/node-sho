"use strict";
require("dotenv").config();
const path = require("path");
import express from "express";
import http from "http";

import expressConfig from "./src/config/express";
import routerConfig from "./routes";
import config from "./src/config/environment";
import passport from "passport";
import seedDataBaseIfNeeded from "./src/config/seed";
import { mongoDBConnection } from "./src/db/mongodb";
import redisConnection from "./src/db/redis";

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
	app.gudShoServer = server.listen(process.env.PORT, config.ip, () => {
		console.log("Express server listening on ", server.address().port);
	});
}

setImmediate(startServer);

export default app;