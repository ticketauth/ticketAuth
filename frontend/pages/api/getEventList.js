import mongoose from "mongoose";

import event from "../../utils/eventModel";

import dbConnect from "../../utils/mongodb";

export default async function handler(req, res) {
	try {
		await dbConnect();

		let eventIdList = req.body;

		eventIdList = ["2221", "2223"];

		let allPromises = [];

		for (let index in eventIdList) {
			console.log(eventIdList[index]);
			allPromises.push(event.findOne({ EventId: eventIdList[index] }));
		}

		let eventList = await Promise.all(allPromises);

		// const allEvents = await event.find({ walletAddress: query.walletAddress });
		// console.log(allEvents);

		res.status(200).json(eventList);
	} catch (error) {
		console.log(error);
	}
}
