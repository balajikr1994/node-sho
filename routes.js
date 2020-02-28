"use strict";

import user from "./src/api/router/user/user.route";
import auth from "./src/auth";
import authAPI from "./src/api/auth";

import { serve, setup } from "swagger-ui-express";
import { swaggerUI } from "./src/config/swagger";

export default function(app) {
	app.use("/v1/auth/token", auth);
	app.use("/v1/api/users", user);
	app.use("/v1/api/auth", authAPI);
	app.use("/api-docs", serve, setup(swaggerUI));
}
