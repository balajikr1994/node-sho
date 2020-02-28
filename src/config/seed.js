"use strict";

import userModel from "../api/models/user/user.model";
import config from "./environment";

export default function seedDataBaseIfNeeded() {
	if (!config.seedDB) {
		return Promise.resolve();
	}

	let promises = [];

	const userPromise = userModel
		.find({})
		.deleteMany()
		.then(() => {
			userModel
				.create({
					first_name: "Balaji",
					last_name: "KR",
					email: "balaji.r@contus.in",
					gender: 1,
					country_code: "IN",
					mobile: "9629676933",
					salt: "ai7dqO87iCqjuUo/hEzdtA==",
					hashed_password:
						"wTscKhjc2RShd4BNQiRjN+3oEelgJyXrZaVooz0yJLIWqCRQV1IkzESb4im2UTXtSpze6HBM+aerbVOk4k8YLw==",
					created_at: new Date(),
					updated_at: new Date()
				})
				.then(() => console.log("finished populating users"))
				.catch(err => console.log("error populating users", err));
		});
	promises.push(userPromise);
	return Promise.all(promises);
}
