import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
	"Name of event": String, //Elon musk firing party
	"Event Description": String, //Welcome to the mass firing event of Twitter hosted by the almighty Elon Musk.
	Category: String,
	walletAddress: String, //AD23vfW14
	"Start Datetime": String, //idk what format String or date in mongodb, this will include start time also
	"End Datetime": String, //same as start, with time also
	Location: String, //Maybe postal code or some other identifiers as fields might be better
	"Organizers Email": String, //elonmusk@gmail.com
	Organizer: String,
	"Event Capacity": Number, //2000
	"Ticket price": Number, //7.99
	"Ticket Image": String, //a url? or a Base64 String as img
	"Background Image": String,
	EventId: String, //ASDL124Vfrfw3
	active: Boolean, //if event is currently active,
	candyMachineId: String,
	collectionId: String,
});

module.exports = mongoose.models.event || mongoose.model("event", eventSchema);
