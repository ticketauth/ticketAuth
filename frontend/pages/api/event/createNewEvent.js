import event from '../../../utils/dataModel/eventModel';

import dbConnect from '../../../utils/mongodb';

// const walletAddress = "222";

export default async function handler(req, res) {
  try {
    await dbConnect();

    // const data = .data;
    const data = req.body.createEventDetails;
    console.log('DATA', data);

    const files = await event.find({
      WalletAddress: data.WalletAddress,
    });

    data.EventId = data.WalletAddress + files.length;
    data.active = true;

    // console.log(data);
    await event.create(data);

    res.status(200).json({});
  } catch (error) {
    console.log(error);
  }
}
