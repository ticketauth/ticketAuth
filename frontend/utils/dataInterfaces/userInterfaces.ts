export interface UserData {
  WalletAddress: string;
  EventAttends: [string];
  EventCreated: [string];
  FirstName: string;
  LastName: string;
  Email: string;
  ManagedWalletPK: string;
}

export interface updateUserData {
  WalletAddress: string;
  FirstName: string;
  LastName: string;
  Email: string;
}
