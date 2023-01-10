import mongoose from 'mongoose';

import event from '../../../utils/dataModel/eventModel';

import dbConnect from '../../../utils/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();

    let eventId = req.body;

    const allEvents = await event.deleteOne({ eventId: eventId });

    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
  }
}
