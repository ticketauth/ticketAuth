import axios from 'axios';
import { UserData, updateUserData } from '../dataInterfaces/userInterfaces';
const API = '../../api/user';

// tsChangeDone

// User -----------------------------------------------------------------
// Write --------------------------------------

export async function updateUser(updateUserData: updateUserData): Promise<boolean> {
  // param {walletAddress, firstName, lastName, email}
  // return boolean of the transactions, true: success, false: failed
  let status: boolean = (
    await axios.post(`${API}/updateUser`, {
      updateUserData,
    })
  ).data.status;

  return status;
}

// Write --------------------------------------

// Read--------

export async function getUser(walletAddress: string): Promise<UserData> {
  // param {walletAddress}
  //Return userDetails
  const userDetails: UserData = (
    await axios.post(`${API}/getUser`, {
      walletAddress,
    })
  ).data.userDetails;

  return userDetails;
}

// Read -----

// User -----------------------------------------------------------------
