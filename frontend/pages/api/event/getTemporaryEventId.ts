import mongoose from 'mongoose';
import { EventData, UserData } from '../../../utils/dataInterfaces';
import user from '../../../utils/dataModel/userModel';
import dbConnect from '../../../utils/mongodb';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    let walletAddress: string = req.body.walletAddress;

    let filter = { walletAddress };

    let userInfo: UserData = await user.findOne(filter);

    let EventIdList: EventData[] = userInfo.eventCreated;

    let EventId: string = walletAddress + EventIdList.length;

    res.status(200).json({ EventId });
  } catch (error) {
    console.log(error);
  }
}
