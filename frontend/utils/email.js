import axios from "axios";

const API = "../api/email";

export const ticketConfirmation = async (email) => {
	const result = await axios.post(API + "/ticketConfirmation", {
		email: email,
	});
};
