import mongoose from 'mongoose';
import event from '../../../utils/dataModel/eventModel';
import dbConnect from '../../../utils/mongodb';

//  tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    let walletAddress = req.body.walletAddress;

    let filter = { walletAddress };

    const organizerEventList = await event.find(filter);

    res.status(200).json({ organizerEventList });
  } catch (error) {
    console.log(error);
  }
}
