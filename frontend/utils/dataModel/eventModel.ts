import mongoose from 'mongoose';
import { EventData } from '../dataInterfaces';
const Schema = mongoose.Schema;

// tsChangeDone

const eventSchema = new Schema<EventData>({
  'Name of event': String,
  'Event Description': String,
  walletAddress: String,
  'Start Event Datetime': String,
  'End Event Datetime': String,
  'Start Sale Datetime': String,
  'End Sale Datetime': String,
  Location: String,
  'Organizers Email': String,
  Organizer: String,
  'Event Capacity': Number,
  'Ticket price': Number,
  'Ticket Image': String,
  'Background Image': String,
  eventId: String, //ASDL124Vfrfw3
  active: Boolean, //if event is currently active,
  candyMachineId: String,
  collectionId: String,
});

export default mongoose.models.event || mongoose.model<EventData>('event', eventSchema);
