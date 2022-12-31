import mongoose from "mongoose";

const Schema = mongoose.Schema;

const schema = new Schema({
	EventId: String,
	metadata: [Schema.Types.Mixed],
	nft: [Buffer],
});

export default mongoose.models.nft || mongoose.model("nft", schema);
