//  tsChangeDone

import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

import model from '../../../utils/dataModel/nftModel';

export default async function handler(req, res) {
  let status = false;
  try {
    await dbConnect();

    const nftDetails = req.body.nftDetails;

    const result = await model.create(nftDetails);

    status = true;

    // console.log(result);
  } catch (error) {
    console.log(error);
  }

  res.status(200).json({ status });
}
