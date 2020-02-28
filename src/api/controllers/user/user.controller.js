/**
 * Using standard endpoints.
 * GET     /api/users                       ->  index
 * POST    /api/users                       ->  create
 * GET     /api/users/:id                   ->  show
 */

"use strict";

const sendRsp = require("../../../utils/response");
const resourceModel = require("../../../config/resource").resourceModel;

const { validationResult } = require("express-validator");

export const index = async (req, res) => {
	try {
		const getUsers = await resourceModel["users"].find();
		return sendRsp(res, 200, "OK", {
			users: getUsers
		});
	} catch (error) {
		return sendRsp(res, 500, "Server Error", {
			error: error
		});
	}
};

export const show = async (req, res) => {
	try {
		const getUser = await resourceModel["users"].findById(req.params.id);
		return sendRsp(res, 200, "OK", {
			users: getUser
		});
	} catch (error) {
		return sendRsp(res, 500, "Server Error", {
			error: error
		});
	}
};

export const create = async (req, res) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return sendRsp(res, 400, "Missing Body Params!!!", errors);
		}
		await resourceModel["users"].create(req.body);
		return sendRsp(res, 201, "OK");
	} catch (error) {
		if (error.code === 11000) {
			return sendRsp(res, 406, "User Already Exists!!!");
		}
		return sendRsp(res, 500, "Server Error", {
			error: error.message
		});
	}
};

export const me = async (req, res) => {
	try {
		const user = await resourceModel["users"].findById(
			req.user._id,
			"-tokens -salt -hashed_password"
		);
		return sendRsp(res, 200, "OK", {
			users: user
		});
	} catch (error) {
		return sendRsp(res, 500, "Server Error", {
			error: error.message
		});
	}
};
