import mongoose from 'mongoose';
import { stringify } from 'querystring';
import { UserData } from '../dataInterfaces/userInterfaces';
const Schema = mongoose.Schema;
// tsChangeDone

const UserSchema = new Schema<UserData>({
  WalletAddress: String,
  EventAttends: [String],
  EventCreated: [String],
  FirstName: String,
  LastName: String,
  Email: String,
  ManagedWalletPK: String,
});

export default mongoose.models.User || mongoose.model<UserData>('User', UserSchema);
