import mongoose from 'mongoose';
import { EventData } from '../../../../utils/dataInterfaces';
import event from '../../../../utils/dataModel/eventModel';
import dbConnect from '../../../../utils/mongodb';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    const allEvents: EventData[] = await event.find({});

    res.status(200).json({ allEvents });
  } catch (error) {
    console.log(error);
  }
}
