"use strict";

import user from "./api/router/user.route";
import auth from "./auth";
import authAPI from "./api/auth";

import { serve, setup } from "swagger-ui-express";
import { swaggerUI } from "./config/swagger";

export default function(app) {
	app.use("/v1/auth/token", auth);
	app.use("/v1/api/users", user);
	app.use("/v1/api/auth", authAPI);
	app.use("/api-docs", serve, setup(swaggerUI));
}
