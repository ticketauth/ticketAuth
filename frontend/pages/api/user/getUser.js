import mongoose from 'mongoose';

import user from '../../../utils/dataModel/userModel';

import dbConnect from '../../../utils/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();

    let status = false;

    let walletAddress = req.body.walletAddress;

    const exists = await user.exists({ walletAddress: walletAddress });

    if (!exists) {
      const result = await user.create({
        walletAddress: walletAddress,
        eventAttends: [],
        eventCreated: [],
        firstName: '',
        lastName: '',
        email: '',
      });

      console.log(result);

      res.status(200).json(result);
    } else {
      const userDetails = await user.findOne({ walletAddress: walletAddress });

      res.status(200).json(userDetails);
    }
  } catch (error) {
    console.log(error);
  }
}
