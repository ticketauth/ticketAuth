interface EventData {
  'Name of event': string, //Elon musk firing party 
  'EventId': string, //ASDL124Vfrfw3
  'organUniqueid': string, //AD23vfW14
  'Start Date': String, //idk what format string or date in mongodb, this will include start time also
  'End Date': String, //same as start, with time also
  'Location Description': string, //Maybe postal code or some other identifiers as fields might be better
  'Organizers Email': string, //elonmusk@gmail.com
  'Event Capacity': Number, //2000
  'Ticket price': Number, //7.99
  'Paid Event': boolean, //true, actually is this required with ticket price? maybe we need this to filter 
  'Ticket Image': string, //a url? or a Base64 string as img
}
export type { EventData }