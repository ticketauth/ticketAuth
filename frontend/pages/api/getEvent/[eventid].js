// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { EventData } from "../../../utils/dataInterfaces";
import event_dets from "../event_dets.json";
import mongoose from "mongoose";

import event from "../../../utils/eventModel";

import dbConnect from "../../../utils/mongodb";

export default async function handler(req, res) {
	const { query } = req;
	console.log(query.walletAddress);
	try {
		await dbConnect();

		const allEvents = await event.find({ EventId: query.EventId });
		// console.log(allEvents);

		res.status(200).json(allEvents);
	} catch (error) {
		console.log(error);
	}
}
