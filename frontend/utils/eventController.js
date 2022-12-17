import axios from "axios";

const API = "../api/";

export async function getAllEvents() {
	const events = await axios.get(API + "getEvent");
	return events.data;
}

export async function getEventById(EventId) {
	const event = await axios.post(`${API}/getEvent/${EventId}`);
	return event.data;
}

export async function getUserEventsList(walletAddress) {
	const events = await axios.post(`${API}/getUserEventsList`, {
		walletAddress,
	});

	return events.data;
}

export async function getEventByWalletAddress(walletAddress) {
	const events = await axios.post(`${API}/getEventByWalletAddress`, {
		walletAddress,
	});

	return events.data;
}

export async function createUser(walletAddress) {
	await axios.post(`${API}/createUser`, {
		walletAddress,
	});
}

export async function createNewEvent(eventDetails) {
	console.log(eventDetails);
	await axios.post(`${API}/createNewEvent`, {
		eventDetails,
	});
}
