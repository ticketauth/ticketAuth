import { EventData } from "../../../utils/dataInterfaces";

import dbConnect from "../../../utils/mongodb";
import mongoose from "mongoose";

import user from "../../../utils/dataModel/userModel";

export default async function handler(req, res) {
	try {
		await dbConnect();

		const walletAddress = req.body.walletAddress;

		const exists = await user.exists({ walletAddress: walletAddress });

		if (!exists) {
			const result = await user.create({
				walletAddress: walletAddress,
				eventAttends: [],
				eventCreated: [],
			});

			res.json(true);
		} else {
			res.status(200).json(false);
		}

		// console.log(result);
	} catch (error) {
		console.log(error);
	}
}
