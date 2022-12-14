// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { EventData } from '../../../utils/dataInterfaces';
import event_dets from "../event_dets.json";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EventData>
) {
  const { query } = req;
  res.status(200).json(event_dets)
}