import mongoose from 'mongoose';
import { stringify } from 'querystring';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  walletAddress: String,
  eventAttends: [String],
  eventCreated: Number,
  firstName: String,
  lastName: String,
  email: String,
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
