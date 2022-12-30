import mongoose from "mongoose";

import event from "../../../utils/dataModel/eventModel";

import user from "../../utils/dataModel/userModel";

import dbConnect from "../../../utils/mongodb";

export default async function handler(req, res) {
	try {
		await dbConnect();

		let walletAddress = req.body.walletAddress;

		let userInfo = await user.findOne({ walletAddress: walletAddress });
		// console.log(userInfo.eventCreated);

		let eventIdList = userInfo.eventCreated;

		let allPromises = [];

		for (let index in eventIdList) {
			console.log(eventIdList[index]);
			allPromises.push(event.findOne({ EventId: eventIdList[index] }));
		}

		let eventList = await Promise.all(allPromises);

		console.log(eventList);

		res.status(200).send(eventList);
	} catch (error) {
		console.log(error);
	}
}
