import mongoose from 'mongoose';
import { UserData } from '../../../utils/dataInterfaces/userInterfaces';
import { EventData } from '../../../utils/dataInterfaces/eventInterfaces';
import user from '../../../utils/dataModel/userModel';
import dbConnect from '../../../utils/mongodb';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    let walletAddress = req.body.walletAddress;

    let filter = { walletAddress };

    let userInfo = await user.findOne(filter);

    let EventIdList = userInfo.eventCreated;

    let EventId = walletAddress + EventIdList.length;

    res.status(200).json({ EventId });
  } catch (error) {
    console.log(error);
  }
}
