import axios from 'axios';
// import img from '../../utils/emailTicket.png';
import {
  EventPublishedEmailData,
  TicketConfirmationEmailData,
} from '../dataInterfaces/emailInterfaces';
const API = '../../api/email';

// done
export async function ticketConfirmation(ticketConfirmationDetails: TicketConfirmationEmailData) {
  // eventName, eventDetailsLink, ticketImage, email

  let status: boolean = await axios.post(`${API}/ticketConfirmation`, {
    ticketConfirmationDetails,
  });

  return status;
}

export async function eventPublished(eventPublishedDetails: EventPublishedEmailData) {
  // eventName, eventDetailsLink, eventImage, email, collectionId
  let status = await axios.post(`${API}/eventPublished`, {
    eventPublishedDetails,
  });

  return status;
}
