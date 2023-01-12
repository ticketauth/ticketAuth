import mongoose from 'mongoose';

import user from '../../../utils/dataModel/userModel';

import dbConnect from '../../../utils/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();

    let walletAddress = req.body.walletAddress;

    let userInfo = await user.findOne({ walletAddress: walletAddress });
    // console.log(userInfo.eventCreated);

    let eventIdList = userInfo.eventCreated;
    console.log(eventIdList);

    let eventId = walletAddress + eventIdList.length;

    res.status(200).json({ eventId });
  } catch (error) {
    console.log(error);
  }
}
