import { EventData } from './dataInterfaces';

const getEventDets = async (eventId: string): Promise<EventData> => {
  const data = await fetch(`/api/dont_delete/event/${eventId}`, {
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
