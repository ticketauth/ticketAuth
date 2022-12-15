import { EventData } from "../../utils/dataInterfaces";

import dbConnect from "../../utils/mongodb";
import mongoose from "mongoose";

import user from "../../utils/userModel";

export default async function handler(req, res) {
	try {
		await dbConnect();

		const testWallet = "1323";

		const exists = await user.exists({ walletAddress: testWallet });

		if (exists) {
			const result = await user.create({
				walletAddress: testWallet,
				eventAttends: [],
				eventCreated: [],
			});
		}

		// console.log(result);

		res.status(200);
	} catch (error) {
		console.log(error);
	}
}
