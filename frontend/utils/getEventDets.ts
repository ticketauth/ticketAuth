import { EventData } from './dataInterfaces/eventInterfaces';

const getEventDets = async (EventId: string): Promise<EventData> => {
  const data = await fetch(`/api/dont_delete/event/${EventId}`, {
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  return data;
};
export default getEventDets;
