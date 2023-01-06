import { EventData } from '../../../utils/dataInterfaces';

import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

import user from '../../../utils/dataModel/userModel';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const data = req.body;

    const exists = await user.exists({ walletAddress: data.walletAddress });

    if (!exists) {
      const result = await user.create({
        walletAddress: data.walletAddress,
        eventAttends: [],
        eventCreated: 0,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
      });

      res.json(true);
    } else {
    }

    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}
