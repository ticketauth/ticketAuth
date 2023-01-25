import { WalletContextState } from '@solana/wallet-adapter-react';
import { type Connection } from '@solana/web3.js';

export interface CandyMachineData {
  EventName: string;
  EventDescription: string;
  StartEventDatetime: string;
  EndEventDatetime: string; //same as start, with time also
  StartSaleDatetime: string;
  EndSaleDatetime: string;
  EventCapacity: number;
  TicketPrice: number;
  TicketFile: File;
  Wallet: WalletContextState;
  Connection: Connection;
}
