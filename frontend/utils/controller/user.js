import axios from 'axios';

const API = '../../api/user';

// User -----------------------------------------------------------------
// Write --------------------------------------
export async function signUp(userDetails) {
  // pass {walletAddress, firstName, lastName, email}
  // return user Doc
  const res = await axios.post(`${API}/signUp`, {
    userDetails,
  });
  console.log(res);
}

// Write --------------------------------------

// Read--------

export async function getUser(walletAddress) {
  //Return False or userDetails
  const user = await axios.post(`${API}/getUser`, {
    walletAddress,
  });

  return user.data;
}

// Read -----

// User -----------------------------------------------------------------
