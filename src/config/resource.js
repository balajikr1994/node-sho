"use strict";

import userModel from "../api/models/user/user.model";

//MODELS CONFIGURATION
export const resourceModel = {
	users: userModel
};

//NAMING CONVENTIONS
export const resources = {
	users: "users"
};

//CONFIGURATION ALL POPULATE COLLECTIONS
export const references = {
	movies: [{
		select: "director_id",
		path: "name address"
	}]
};
