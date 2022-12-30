import mongoose from "mongoose";

import event from "../../../utils/dataModel/eventModel";


import dbConnect from "../../utils/mongodb";

export default async function handler(req, res) {
	try {
		await dbConnect();

		let walletAddress = req.body.walletAddress;

		const allEvents = await event.find({ walletAddress: walletAddress });
		console.log(allEvents);

		res.status(200).json(allEvents);
	} catch (error) {
		console.log(error);
	}
}
