import mongoose from 'mongoose';
import { UserData } from '../../../utils/dataInterfaces/userInterfaces';
import { EventData } from '../../../utils/dataInterfaces/eventInterfaces';
import event from '../../../utils/dataModel/eventModel';

import user from '../../../utils/dataModel/userModel';

import dbConnect from '../../../utils/mongodb';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    let walletAddress = req.body.walletAddress;

    let filter = { walletAddress };

    let userDetails = await user.findOne(filter);
    // console.log(userInfo.eventCreated);

    let EventIdList = userDetails.eventCreated;

    let allPromises = [];

    for (let index in EventIdList) {
      allPromises.push(event.findOne({ EventId: EventIdList[index] }));
    }

    let userEventsList = await Promise.all(allPromises);

    res.status(200).json({ userEventsList });
  } catch (error) {
    console.log(error);
  }
}
