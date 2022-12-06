
const getEvents = async (): Promise<{data: Array<{name:String}>}> =>{
  const data = await fetch('/api/testEvents', {
    method: 'GET',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    return data
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  return data;
}
export default getEvents