import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	"Name of event": String,
	"Event Description": String,
	walletAddress: String,
	"Start Datetime": String,
	"End Datetime": String,
	Location: String,
	"Organizers Email": String,
	"Event Capacity": Number,
	"Ticket price": Number,
	"Ticket Image": String,
	"Background Image": String,
	EventId: String, //ASDL124Vfrfw3
	active: Boolean, //if event is currently active,
	candyMachineId: String,
	collectionId: String,
});

export default mongoose.models.event || mongoose.model("event", eventSchema);
