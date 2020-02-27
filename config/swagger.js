export const swaggerUI = {
	swagger: "2.0",
	info: {
		version: "1.0.0",
		title: "GudSho Swagger",
		description: "Gudsho Swagge API documentation",
		license: {
			name: "GudSho",
			url: "https://www.gudsho.com/"
		}
	},
	servers: {
		url: "http://localhost:" + process.env.PORT
	},
	basePath: "/v1/api",
	tags: [
		{
			name: "Login",
			description: "Login API"
		}
	],
	schemes: ["http"],
	consumes: ["application/json", "multipart/form-data"],
	produces: ["application/json", "multipart/form-data"],
	components: {
		securitySchemes: {
			BearerAuth: {
				type: "http",
				scheme: "bearer",
				bearerFormat: "JWT"
			},
			basicAuth: {
				type: "http",
				scheme: "basic"
			}
		}
	},
	securityDefinitions: {
		Bearer: {
			type: "apiKey",
			name: "Authorization",
			in: "header"
		},
		basicAuth: {
			type: "basic"
		}
	},
	security: [
		{
			Bearer: []
		}
	],
	paths: {
		"/auth/login": {
			post: {
				tags: ["Login"],
				summary: "Login into application",
				parameters: [
					{
						name: "username",
						in: "body",
						description: "email",
						schema: {
							$ref: "#/definitions/Login"
						}
					}
				],
				produces: ["application/json"],
				responses: {
					"200": {
						description: "Success",
						schema: {
							$ref: "#/responses/LoginSuccessResponse"
						}
					},
					"401": {
						description: "Invalid EmailId or Password",
						schema: {
							$ref: "#/responses/LoginFailureResponse"
						}
					}
				}
			}
		}
	},
	definitions: {
		Login: {
			required: ["username", "password"],
			properties: {
				username: {
					type: "string"
				},
				password: {
					type: "string"
				}
			}
		}
	},
	responses: {
		LoginSuccessResponse: {
			properties: {
				access_token: {
					type: "string"
				},
				expires_in: {
					type: "string"
				},
				refresh_token: {
					type: "string"
				}
			}
		},
		LoginFailureResponse: {
			properties: {}
		}
	}
};
