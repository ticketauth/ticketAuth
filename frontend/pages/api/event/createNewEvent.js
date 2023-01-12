import event from '../../../utils/dataModel/eventModel';

import dbConnect from '../../../utils/mongodb';

// const walletAddress = "222";

export default async function handler(req, res) {
  try {
    await dbConnect();

    // const data = .data;
    const data = req.body.eventDetails;

    const files = await event.find({
      walletAddress: data.walletAddress,
    });

    data.eventId = data.walletAddress + files.length;
    data.active = true;

    console.log("Creating event with these dets:",data);
    await event.create(data);

    res.status(200).json({});
  } catch (error) {
    console.log(error);
  }
}
