import axios from "axios";

const API = "../../api/user";

// User -----------------------------------------------------------------
// Write --------------------------------------
export async function createUser(userDetails) {
	await axios.post(`${API}/createUser`, {
		userDetails,
	});
}

// Write --------------------------------------

// Read--------

export async function getUserByWalletAddress(walletAddress) {
	const user = await axios.post(`${API}/getUserByWalletAddress`, {
		walletAddress,
	});

	return user.data;
}

// Read -----

// User -----------------------------------------------------------------
