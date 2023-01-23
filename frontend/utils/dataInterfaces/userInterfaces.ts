export interface UserData {
  walletAddress: string;
  eventAttends: [string];
  eventCreated: [string];
  firstName: string;
  lastName: string;
  email: string;
  managedWalletPK: string;
}

export interface updateUserData {
  walletAddress: string;
  firstName: string;
  lastName: string;
  email: string;
}
