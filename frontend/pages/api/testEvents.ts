// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { EventData } from '../../utils/dataInterfaces';
import events_data from "./events_data.json";

type Data = {data: Array<EventData>}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("FUCK")
  console.log(events_data)
  res.status(200).json(events_data)
}