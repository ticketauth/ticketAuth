import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	"Name of event": String,
	EventId: String,
	"Event Description": String,
	walletAddress: String,
	"Start Datetime": String,
	"End Datetime": String,
	Location: String,
	Coordinates: { lat: Number, lng: Number },
	"Organizers Email": String,
	"Event Capacity": Number,
	"Ticket price": Number,
	"Ticket Image": String,
	"Background Image": String,
	active: Boolean, //if event is currently active
	CollectionId: String,
	CandyMachineId: String,
});

module.exports = mongoose.models.event || mongoose.model("event", eventSchema);
