import { WalletContextState } from '@solana/wallet-adapter-react';
import { type Connection } from '@solana/web3.js';
export interface EventData {
  'Name of event': string; //Elon musk firing party
  'Event Description': string; //Welcome to the mass firing event of Twitter hosted by the almighty Elon Musk.
  Category: string;
  walletAddress: string; //AD23vfW14
  'Start Event Datetime': string; //idk what format string or date in mongodb, this will include start time also
  'End Event Datetime': string; //same as start, with time also
  'Start Sale Datetime': string;
  'End Sale Datetime': string;
  Location: string; //Maybe postal code or some other identifiers as fields might be better
  'Organizers Email': string; //elonmusk@gmail.com
  Organizer: string;
  'Event Capacity': number; //2000
  'Ticket price': number; //7.99
  'Ticket Image': string; //a url? or a Base64 string as img
  'Background Image': string;
  EventId: string; //ASDL124Vfrfw3
  active: boolean; //if event is currently active,
  candyMachineId: string;
  collectionId: string;
}

export interface UserData {
  walletAddress: string;
  eventAttends: [string];
  eventCreated: [string];
  firstName: string;
  lastName: string;
  email: string;
}

export interface DateData {
  day: string;
  date: number;
  month: string;
  year: number;
  time: string;
}

export interface FormInputData {
  'Name of event': string; //Elon musk firing party
  'Event Description': string; //Welcome to the mass firing event of Twitter hosted by the almighty Elon Musk.
  Category: string;
  walletAddress: string; //AD23vfW14
  'Start Event Datetime': string; //idk what format string or date in mongodb, this will include start time also
  'End Event Datetime': string; //same as start, with time also
  'Start Sale Datetime': string;
  'End Sale Datetime': string;
  Location: string; //Maybe postal code or some other identifiers as fields might be better
  'Organizers Email': string; //elonmusk@gmail.com
  Organizer: string;
  'Event Capacity': number; //2000
  'Ticket price': number; //7.99
  'Ticket Image': string; //a url? or a Base64 string as img
  'Background Image': string;
  // eventId: string; //ASDL124Vfrfw3
  // active: boolean; //if event is currently active,
}

export interface CandyMachineData {
  'Name of event': string;
  'Event Description': string;
  'Start Event Datetime': string;
  'End Event Datetime': string;
  'Start Sale Datetime': string;
  'End Sale Datetime': string;
  'Event Capacity': number;
  'Ticket price': number;
  ticketFile: File;
  wallet: WalletContextState;
  connection: Connection;
}
