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
        eventCreated: 0,
        firstName: '',
        lastName: '',
        email: '',
      });

      res.status(200).json(status);
    } else {
      const userDetails = await user.find({ walletAddress: walletAddress });

      if (userDetails.email === '') {
        res.status(200).json(status);
      } else {
        res.status(200).json(userDetails);
      }
    }
  } catch (error) {
    console.log(error);
  }
}
