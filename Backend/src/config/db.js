import { connect, disconnect } from "mongoose";
async function connectToDatabase() {
  try {
    let DBString=process.env.MONGODB_URL+"/"+process.env.DB_NAME
    console.log(DBString)
    await connect(DBString);

  } catch (error) {
    console.log(error);
    throw new Error("Could not Connect To MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log(error);
    throw new Error("Could not Disconnect From MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };