import mongoose from 'mongoose';

import event from '../../../../utils/dataModel/eventModel';

import dbConnect from '../../../../utils/mongodb';

// const walletAddress = "222";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const allEvents = await event.find({});
<<<<<<< HEAD
=======
<<<<<<< HEAD
    // console.log(allEvents);
=======
>>>>>>> 51f3212 (signup flow done)
>>>>>>> dfc8d86 (signup flow done)

    res.status(200).json(allEvents);
  } catch (error) {
    console.log(error);
  }
}
