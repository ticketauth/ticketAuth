// tsChangeDone
import axios from 'axios';
import { NftData } from '../dataInterfaces/nftInterfaces';
const API = '../../api/nft';

// Write --------------------------------------
export async function createNft(nftDetails: NftData): Promise<boolean> {
  // Params {EventId, metadata, nft}
  // return boolean true: success, false:failed
  const status: boolean = (await axios.post(`${API}/createNft`, { nftDetails })).data.status;
  return status;
}
// Write --------------------------------------

// read --------------------------------------------------

export async function getNftByEventId(EventId: string): Promise<NftData> {
  // params (EventId)
  // nftDetails {EventId, metadata, nft}
  const nftDetails: NftData = (await axios.post(`${API}/getNftByEventId`, { EventId })).data
    .nftDetails;

  return nftDetails;
}

// read --------------------------------------------------
