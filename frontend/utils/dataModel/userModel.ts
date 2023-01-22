import mongoose from 'mongoose';
import { stringify } from 'querystring';
import { UserData } from '../dataInterfaces';
const Schema = mongoose.Schema;
// tsChangeDone

const UserSchema = new Schema<UserData>({
  walletAddress: String,
  eventAttends: [String],
  eventCreated: [String],
  firstName: String,
  lastName: String,
  email: String,
});

export default mongoose.models.User || mongoose.model<UserData>('User', UserSchema);
