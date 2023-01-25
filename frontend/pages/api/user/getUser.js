import mongoose from 'mongoose';
import user from '../../../utils/dataModel/userModel';
import dbConnect from '../../../utils/mongodb';

import { UserData } from '../../../utils/dataInterfaces/userInterfaces';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    let walletAddress = req.body.walletAddress;

    let userDetails;

    const exists = await user.exists({ walletAddress: walletAddress });

    if (!exists) {
      userDetails = await user.create({
        walletAddress: walletAddress,
        eventAttends: [],
        eventCreated: [],
        firstName: '',
        lastName: '',
        email: '',
      });
    } else {
      let filter = { walletAddress: walletAddress };

      userDetails = await user.findOne(filter);
    }

    res.status(200).json({ userDetails });
  } catch (error) {
    console.log(error);
  }
}
