import mongoose from 'mongoose';
import { EventData } from '../dataInterfaces/eventInterfaces';
const Schema = mongoose.Schema;

// tsChangeDone

const eventSchema = new Schema<EventData>({
  EventId: String, //ASDL124Vfrfw3
  Active: Boolean, //if event is currently active,
  CandyMachineId: String,
  CollectionId: String,
  EventName: String, //Elon musk firing party
  EventDescription: String, //Welcome to the mass firing event of Twitter hosted by the almighty Elon Musk.
  Category: String,
  WalletAddress: String, //AD23vfW14
  StartEventDatetime: String, //idk what format String or date in mongodb, this will include start time also
  EndEventDatetime: String, //same as start, with time also
  StartSaleDatetime: String,
  EndSaleDatetime: String,
  Location: String, //Maybe postal code or some other identifiers as fields might be better
  OrganizersEmail: String, //elonmusk@gmail.com
  Organizer: String,
  EventCapacity: Number, //2000
  TicketPrice: Number, //7.99
  TicketImage: String, //a url? or a Base64 String as img
  BackgroundImage: String,
});

export default mongoose.models.event || mongoose.model<EventData>('event', eventSchema);
