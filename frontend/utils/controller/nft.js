import axios from 'axios';

const API = '../../api/nft';

// Write --------------------------------------
export async function createNft(nftDetails) {
  await axios.post(`${API}/createNft`, nftDetails);
}
// Write --------------------------------------

// read --------------------------------------------------

export async function getNftByEventId(EventId) {
  const detail = await axios.post(`${API}/getNftByEventId`, { EventId });
  return detail.data;
}

// read --------------------------------------------------
