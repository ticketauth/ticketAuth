import mongoose from 'mongoose';
import { NftData } from '../dataInterfaces';
// tsChangeDone
const Schema = mongoose.Schema;

const schema = new Schema<NftData>({
  eventId: String,
  metadata: [Schema.Types.Mixed],
  nft: [String],
});

export default mongoose.models.nft || mongoose.model<NftData>('nft', schema);
