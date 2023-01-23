import { WalletContextState } from '@solana/wallet-adapter-react';
import { type Connection } from '@solana/web3.js';

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
