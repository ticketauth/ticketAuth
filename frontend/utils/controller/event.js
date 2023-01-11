import axios from 'axios';

const API = '../../api/event';

// Event -----------------------------------------------------------------
// Read----------------------------------------------

export async function getAllEvents() {
  const events = await axios.get(API + '/getEvent');
  // console.log(events.data);
  return events.data;
}

export async function getEventById(eventId) {
  const event = await axios.post(`${API}/getEvent/${eventId}`);
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

export async function getTemporaryEventId(walletAddress) {
  const result = await axios.post(`${API}/getTemporaryEventId`, {
    walletAddress,
  });
  return result.data.eventId;
}

// Read ----------------------------------------------

// Write -----------------------------------------
export async function createNewEvent(eventDetails) {
  await axios.post(`${API}/createNewEvent`, {
    eventDetails,
  });
}

// Write --------------------------------------------

// Update
export async function updateEvent(eventDetails) {
  await axios.post(`${API}/updateEvent`, {
    eventDetails,
  });
}
// Update

// Delete
export async function deleteEvent(eventId) {
  await axios.post(`${API}/deleteEvent`);
}
// Delete

// Event -------------------------------------------------------------------------------------
