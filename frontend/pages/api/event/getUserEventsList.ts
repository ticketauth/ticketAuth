import mongoose from 'mongoose';
import { EventData, UserData } from '../../../utils/dataInterfaces';

import event from '../../../utils/dataModel/eventModel';

import user from '../../../utils/dataModel/userModel';

import dbConnect from '../../../utils/mongodb';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    let walletAddress: string = req.body.walletAddress;

    let filter = { walletAddress };

    let userDetails: UserData = await user.findOne(filter);
    // console.log(userInfo.eventCreated);

    let eventIdList: string[] = userDetails.eventCreated;

    let allPromises = [];

    for (let index in eventIdList) {
      allPromises.push(event.findOne({ eventId: eventIdList[index] }));
    }

    let userEventsList: EventData[] = await Promise.all(allPromises);

    res.status(200).json({ userEventsList });
  } catch (error) {
    console.log(error);
  }
}
