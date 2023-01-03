import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';

import model from '../../../utils/dataModel/nftModel';

export default async function handler(req, res) {
  try {
    await dbConnect();

    const details = req.body;

    console.log(details);
    const result = await model.create(details);


		res.status(200).json(true);


    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}
