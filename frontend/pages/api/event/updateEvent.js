import event from '../../../utils/dataModel/eventModel';


import dbConnect from "../../../utils/mongodb";


// const walletAddress = "222";

export default async function handler(req, res) {
  try {
    await dbConnect();


		const data = req.body.eventDetails;


    const files = await event.findOneAndUpdate({ EventId: data.EventId }, data);


		res.status(200).json({});
	} catch (error) {
		console.log(error);
	}

}
