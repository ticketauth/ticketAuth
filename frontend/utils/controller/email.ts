import axios from 'axios';
import img from '../../utils/emailTicket.png';
import { EventPublishedData, TicketConfirmationData } from '../dataInterfaces';
const API = '../../api/email';

export interface ticketConfirmationInterface {
  eventName: string;
  eventDetailsLink: string;
  ticketImage: string;
  email: string;
}

// done
export async function ticketConfirmation(ticketConfirmationDetails: TicketConfirmationData) {
  // eventName, eventDetailsLink, ticketImage, email

  let status: boolean = await axios.post(`${API}/ticketConfirmation`, {
    ticketConfirmationDetails,
  });

  return 'true';
}

export async function eventPublished(eventPublishedDetails: EventPublishedData) {
  // eventName, eventDetailsLink, eventImage, email, collectionId
  let result = await axios.post(`${API}/eventPublished`, {
    eventPublishedDetails,
  });

  return 'true';
}
