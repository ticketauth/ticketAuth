// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import event from '../../../../utils/dataModel/eventModel';

import dbConnect from '../../../../utils/mongodb';

export default async function handler(req, res) {
  const { query } = req;
  console.log(query.walletAddress);
  try {
    await dbConnect();

    const allEvents = await event.findOne({ EventId: query.eventid });

    console.log(allEvents);

    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
  }
}
