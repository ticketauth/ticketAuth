import { EventData } from '../../../utils/dataInterfaces/eventInterfaces';
import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';
import user from '../../../utils/dataModel/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserData, updateUserData } from '../../../utils/dataInterfaces/userInterfaces';

// tsChangeDone
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: boolean }>,
) {
  let status: boolean = false;

  try {
    await dbConnect();

    const data: updateUserData = req.body.userDetails;

    const filter = { walletAddress: data.walletAddress };

    let update = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };

    const result = await user.findOneAndUpdate(filter, update);

    status = true;
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ status });
}
