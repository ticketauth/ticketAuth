export interface EventData {
  EventId: string; //ASDL124Vfrfw3
  Active: boolean; //if event is currently active,
  CandyMachineId: string;
  CollectionId: string;
  EventName: string; //Elon musk firing party
  EventDescription: string; //Welcome to the mass firing event of Twitter hosted by the almighty Elon Musk.
  Category: string;
  WalletAddress: string; //AD23vfW14
  StartEventDatetime: string; //idk what format string or date in mongodb, this will include start time also
  EndEventDatetime: string; //same as start, with time also
  StartSaleDatetime: string;
  EndSaleDatetime: string;
  Location: string; //Maybe postal code or some other identifiers as fields might be better
  OrganizersEmail: string; //elonmusk@gmail.com
  Organizer: string;
  EventCapacity: number; //2000
  TicketPrice: number; //7.99
  TicketImage: string; //a url? or a Base64 string as img
  BackgroundImage: string;
}

export interface CreateEventFormData {
  EventId: string;
  EventName: string; //Elon musk firing party
  EventDescription: string; //Welcome to the mass firing event of Twitter hosted by the almighty Elon Musk.
  Category: string;
  WalletAddress: string; //AD23vfW14
  StartEventDatetime: string; //idk what format string or date in mongodb, this will include start time also
  EndEventDatetime: string; //same as start, with time also
  StartSaleDatetime: string;
  EndSaleDatetime: string;
  Location: string; //Maybe postal code or some other identifiers as fields might be better
  OrganizersEmail: string; //elonmusk@gmail.com
  Organizer: string;
  EventCapacity: number; //2000
  TicketPrice: number; //7.99
  TicketImage: string; //a url? or a Base64 string as img
  BackgroundImage: string;
}

export interface NonCreateEventFormData {
  Active: boolean;
  CandyMachineId: string;
  CollectionId: string;
}
