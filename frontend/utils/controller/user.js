import axios from 'axios';

const API = '../../api/user';

// User -----------------------------------------------------------------
// Write --------------------------------------

export async function updateUser(userDetails) {
  // param {walletAddress, firstName, lastName, email}
  // return userDetails
  await axios.post(`${API}/updateUser`, {
    userDetails,
  });
  console.log(res);
}

// Write --------------------------------------

// Read--------

export async function getUser(walletAddress) {
  // param {walletAddress}
  //Return False or userDetails
  const user = await axios.post(`${API}/getUser`, {
    walletAddress,
  });

  return user.data;
}

// Read -----

// User -----------------------------------------------------------------
