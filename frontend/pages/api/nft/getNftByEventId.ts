import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';
import model from '../../../utils/dataModel/nftModel';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    let EventId: string = req.body.EventId;

    let filter = { EventId };

    const nftDetails = await model.findOne(filter);

    res.status(200).json(nftDetails);
  } catch (error) {
    console.log(error);
  }
}
