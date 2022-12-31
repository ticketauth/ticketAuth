import axios from 'axios';

const API = '../../api/event';

// Event -----------------------------------------------------------------
// Read----------------------------------------------

export async function getAllEvents() {
  const events = await axios.get(API + '/getEvent');
  console.log(events.data);
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

// Read ----------------------------------------------

// Write -----------------------------------------
export async function createNewEvent(eventDetails) {
  console.log(eventDetails);
  await axios.post(`${API}/createNewEvent`, {
    eventDetails,
  });
}

// Write --------------------------------------------

// Event -------------------------------------------------------------------------------------
