import mongoose from "mongoose";

// Organizer

const event = mongoose.Schema({
	walletAddress: String,
	eventId: String, // 8900  Walletaddress+event count
	organizer: String,
	name: string,
	description: string,
	startDateTime: Date, // check the data type for frontend
	endDateTime: Date, // check the data type for frontend
	location: String,
	postalCode: String,
	organizerEmail: String, // number / email
	capacity: int,
	price: String,
	ticketImage: Buffer,
	backgroundImage: Buffer,
});

const eventInfo = mongoose.Schema({
	walletAddress: String,
	eventId: String,
	attendees: [String], //list of all wallets
	sold: int,
	active: Boolean,
});

const user = mongoose.Schema({
	walletAddress: String,
	eventList: [String], // list of eventid
});
