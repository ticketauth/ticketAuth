import axios from 'axios';

const API = '../../api/user';

// User -----------------------------------------------------------------
// Write --------------------------------------
export async function signUp(userDetails) {
  // pass {walletAddress, firstName, lastName, email}
  // return user Doc
  await axios.post(`${API}/signUp`, {
    userDetails,
  });
}

// Write --------------------------------------

// Read--------

export async function getUser(walletAddress) {
  //Return False or userDetails
  const user = await axios.post(`${API}/getUser`, {
    walletAddress,
  });

  return user.data.status;
}

// Read -----

// User -----------------------------------------------------------------
