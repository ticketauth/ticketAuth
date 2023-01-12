import axios from 'axios';

const API = '../../api/user';

// User -----------------------------------------------------------------
// Write --------------------------------------
<<<<<<< HEAD

export async function updateUser(userDetails) {
  // param {walletAddress, firstName, lastName, email}
  // return userDetails
  await axios.post(`${API}/updateUser`, {
=======
export async function signUp(userDetails) {
  // pass {walletAddress, firstName, lastName, email}
  // return user Doc
  const res = await axios.post(`${API}/signUp`, {
>>>>>>> dfc8d86 (signup flow done)
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
