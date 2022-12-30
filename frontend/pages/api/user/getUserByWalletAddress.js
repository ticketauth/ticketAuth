import mongoose from "mongoose";

import user from "../../../utils/dataModel/userModel";

import dbConnect from "../../../utils/mongodb";

export default async function handler(req, res) {
	try {
		await dbConnect();

		let walletAddress = req.body.walletAddress;

		const userDetails = await user.find({ walletAddress: walletAddress });
		// console.log(allEvents);

		res.status(200).json(userDetails);
	} catch (error) {
		console.log(error);
	}
}
