import axios from 'axios';
import { EventData } from '../dataInterfaces';

const API = '../../api/event';

// Event -----------------------------------------------------------------
// Read----------------------------------------------

// done
export async function getAllEvents(): Promise<EventData[]> {
  const allEvents: EventData[] = (await axios.get(API + '/getEvent')).data.allEvents;
  // console.log(events.data);
  return allEvents;
}

// done
export async function getEventById(eventId: string) {
  const eventDetails: EventData = (await axios.post(`${API}/getEvent/${eventId}`)).data
    .eventDetails;
  return eventDetails;
}

// done
export async function getUserEventsList(walletAddress: string) {
  const userEventsList: EventData[] = (
    await axios.post(`${API}/getUserEventsList`, {
      walletAddress,
    })
  ).data.userEventsList;

  return userEventsList;
}

// done
export async function getEventByWalletAddress(walletAddress: string) {
  const organizerEventList: EventData[] = (
    await axios.post(`${API}/getEventByWalletAddress`, {
      walletAddress,
    })
  ).data.organizerEventList;

  return organizerEventList;
}

// done
export async function getTemporaryEventId(walletAddress: string) {
  const eventId: string = await axios.post(`${API}/getTemporaryEventId`, {
    walletAddress,
  });
  return eventId;
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
