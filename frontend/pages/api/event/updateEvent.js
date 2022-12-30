import mongoose from "mongoose";

import event from "../../../utils/dataModel/eventModel";


import dbConnect from "../../../utils/mongodb";

// const walletAddress = "222";

export default async function handler(req, res) {
	try {
		await dbConnect();

		// const data = req.data;
		const data = {
			walletAddress: "222",
			EventId: "2221",
		};

		const files = await event.findOneAndUpdate({ EventId: data.EventId }, data);

		data.EventId = data.walletAddress + files.length;
		data.active = true;

		await event.create(data);

		res.status(200).json({});
	} catch (error) {
		console.log(error);
	}
}
