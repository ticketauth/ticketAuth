import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const connection = {
  isConnected: false,
}; /* creating connection object*/

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }
  const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

  /* connecting to our database */
  const db = await mongoose.connect(uri);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;
