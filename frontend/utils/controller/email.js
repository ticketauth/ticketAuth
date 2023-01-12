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
