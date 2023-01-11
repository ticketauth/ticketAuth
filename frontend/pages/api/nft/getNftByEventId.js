import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

import model from '../../../utils/dataModel/nftModel';

export default async function handler(req, res) {
  try {
    await dbConnect();

    let eventId = req.body.eventId;

    const nftDetails = await model.findOne({ eventId: eventId });

    res.status(200).json(nftDetails);
  } catch (error) {
    console.log(error);
  }
}
