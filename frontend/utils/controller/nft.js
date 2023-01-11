import axios from 'axios';

const API = '../../api/nft';

// Write --------------------------------------
export async function createNft(nftDetails) {
  await axios.post(`${API}/createNft`, nftDetails);
}
// Write --------------------------------------

// read --------------------------------------------------

export async function getNftByeventId(eventId) {
  const detail = await axios.post(`${API}/getNftByeventId`, { eventId });
  return detail.data;
}

// read --------------------------------------------------
