import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	walletAddress: String,
	eventAttends: [String],
	eventCreated: [String],
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
