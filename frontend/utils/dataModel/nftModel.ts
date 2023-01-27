import mongoose from 'mongoose';
import { NftData } from '../dataInterfaces/nftInterfaces';
// tsChangeDone
const Schema = mongoose.Schema;

const schema = new Schema<NftData>({
  EventId: String,
  Metadata: [Schema.Types.Mixed],
  Nft: [String],
});

export default mongoose.models.nft || mongoose.model<NftData>('nft', schema);
