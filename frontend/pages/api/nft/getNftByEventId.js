import dbConnect from '../../../utils/mongodb';
import mongoose from 'mongoose';
import model from '../../../utils/dataModel/nftModel';
import NextCors from 'nextjs-cors';

// tsChangeDone
export default async function handler(req, res) {
  try {
    await dbConnect();

    await NextCors(req, res, {
      // Options
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    let EventId = req.body.EventId;

    let filter = { EventId };

    const nftDetails = await model.findOne(filter);

    res.status(200).json({ nftDetails });
  } catch (error) {
    console.log(error);
  }
}
