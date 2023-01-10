import { EventData } from '../../../utils/dataInterfaces';

import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

import user from '../../../utils/dataModel/userModel';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const data = req.body.userDetails;

    const filter = { walletAddress: data.walletAddress };

    let update = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    const result = await user.findOneAndUpdate(filter, update);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
}
