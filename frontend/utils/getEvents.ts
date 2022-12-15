import { EventData } from "./dataInterfaces";

const getEvents = async (): Promise<Array<EventData>> =>{
  const data = await fetch('/api/dont_delete/testEvents', {
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((res) => {
    console.log(res.data)
    return res.data
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  return data;
}
export default getEvents