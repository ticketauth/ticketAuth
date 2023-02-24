import axios from 'axios';
import { CreateEventFormData, EventData } from '../dataInterfaces/eventInterfaces';

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
export async function getEventById(EventId: string) {
  const eventDetails: EventData = (await axios.post(`${API}/getEvent/${EventId}`)).data
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
  const EventId: string = (
    await axios.post(`${API}/getTemporaryEventId`, {
      walletAddress,
    })
  ).data.EventId;
  return EventId;
}

// Read ----------------------------------------------

// Write -----------------------------------------

export async function createNewEvent(createEventDetails: EventData) {
  let status: boolean = (
    await axios.post(`${API}/createNewEvent`, {
      createEventDetails,
    })
  ).data.status;
  return status
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
export async function deleteEvent(EventId) {
  await axios.post(`${API}/deleteEvent`);
}
// Delete

// Event -------------------------------------------------------------------------------------
