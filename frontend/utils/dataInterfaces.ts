export interface EventData {
  'Name of event': string, //Elon musk firing party 
  'EventId': string, //ASDL124Vfrfw3
  'Event Description': string, //Welcome to the mass firing event of Twitter hosted by the almighty Elon Musk.
  'walletAddress': string, //AD23vfW14
  'Start Datetime': string, //idk what format string or date in mongodb, this will include start time also
  'End Datetime': string, //same as start, with time also
  'Location': string, //Maybe postal code or some other identifiers as fields might be better
  'Coordinates': {lat:number,lng:number}, //coords
  'Organizers Email': string, //elonmusk@gmail.com
  'Event Capacity': number, //2000
  'Ticket price': number, //7.99
  'Ticket Image': string, //a url? or a Base64 string as img
  'Background Image': string,

  'attendees': string[] //list of all wallets
  'active': boolean //if event is currently active
}

export interface UserData {
  'walletAddress' : string,
  'eventAttends' : [string],
  'ecentCreated' : [string],
}