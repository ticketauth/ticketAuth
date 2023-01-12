import axios from 'axios';
import img from '../../utils/emailTicket.png';
const API = '../../api/email';

export async function ticketConfirmation(ticketConfirmationDetails) {
  // eventName, eventDetailsLink, ticketImage, email
  let result = await axios.post(`${API}/ticketConfirmation`, {
    ticketConfirmationDetails,
  });

  return 'true';
}

export async function eventPublished(eventDetails) {
  // eventName, eventDetailsLink, eventImage, email, collectionId
  let result = await axios.post(`${API}/eventPublished`, {
    eventDetails,
  });

  return 'true';
}
