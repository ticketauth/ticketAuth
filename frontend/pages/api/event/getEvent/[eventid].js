// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import event from '../../../../utils/dataModel/eventModel';

import dbConnect from '../../../../utils/mongodb';

export default async function handler(req, res) {
  const { query } = req;
  try {
    await dbConnect();

<<<<<<< HEAD
    const allEvents = await event.findOne({ eventId: query.eventid });
=======
    const allEvents = await event.findOne({ EventId: query.eventid });
>>>>>>> 3cf3155 (fixed deployment errors)

    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
  }
}
