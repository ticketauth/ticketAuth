export interface EventPublishedEmailData {
  eventName: string;
  eventDetailsLink: string;
  eventImage: string;
  organiserEmail: string;
  collectionId: string;
}

export interface TicketConfirmationEmailData {
  eventName: string;
  eventDetailsLink: string;
  ticketImage: string;
  userEmail: string;
}
