import mongoose from "mongoose";
import { stringify } from "querystring";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	walletAddress: String,
	eventAttends: [String],
	eventCreated: [String],
	firstName: String,
	lastName: String,
	email: String,
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);