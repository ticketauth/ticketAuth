import mongoose from "mongoose";

import event from "../../utils/eventModel";

import dbConnect from "../../utils/mongodb";

// const walletAddress = "222";

export default async function handler(req, res) {
	try {
		await dbConnect();

		// const data = req.data;
		const data = {
			walletAddress: "222",
		};

		const files = await event.find({
			walletAddress: data.walletAddress,
		});

		data.EventId = data.walletAddress + files.length;
		data.active = true;

		await event.create(data);

		res.status(200).json({});
	} catch (error) {
		console.log(error);
	}
}
