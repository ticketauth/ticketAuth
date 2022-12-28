import mongoose from "mongoose";

import event from "../../../../utils/dataModel/eventModel";

import dbConnect from "../../../../utils/mongodb";

// const walletAddress = "222";

export default async function handler(req, res) {
	try {
		await dbConnect();

		const allEvents = await event.find({});
		console.log(allEvents);

		res.status(200).json(allEvents);
	} catch (error) {
		console.log(error);
	}
}
