import mongoose from 'mongoose';

import event from '../../../utils/dataModel/eventModel';

import dbConnect from '../../../utils/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();

    let EventId = req.body;

    const allEvents = await event.deleteOne({ EventId: EventId });

    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
  }
}
