import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

import model from '../../../utils/dataModel/nftModel';

export default async function handler(req, res) {
  try {
    await dbConnect();

    let EventId = req.body.EventId;

    const nftDetails = await model.findOne({ EventId: EventId });

    res.status(200).json(nftDetails);
  } catch (error) {
    console.log(error);
  }
}
