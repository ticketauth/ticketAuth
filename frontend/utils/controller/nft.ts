// tsChangeDone
import axios from 'axios';
import { NftData } from '../dataInterfaces';
const API = '../../api/nft';

// Write --------------------------------------
export async function createNft(nftDetails: NftData): Promise<boolean> {
  // Params {eventId, metadata, nft}
  // return boolean true: success, false:failed
  const status: boolean = (await axios.post(`${API}/createNft`, { nftDetails })).data.status;
  return status;
}
// Write --------------------------------------

// read --------------------------------------------------

export async function getNftByeventId(eventId: string): Promise<NftData> {
  // params (eventId)
  // nftDetails {eventId, metadata, nft}
  const nftDetails: NftData = (await axios.post(`${API}/getNftByeventId`, { eventId })).data
    .nftDetails;

  return nftDetails;
}

// read --------------------------------------------------
