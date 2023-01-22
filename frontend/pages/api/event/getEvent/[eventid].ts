// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import event from '../../../../utils/dataModel/eventModel';
import dbConnect from '../../../../utils/mongodb';

// tsChangeDone
export default async function handler(req, res) {
  const { query } = req;
  try {
    await dbConnect();

    const eventDetails = await event.findOne({ eventId: query.eventid });

    res.status(200).json({ eventDetails });
  } catch (error) {
    console.log(error);
  }
}
