import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("mongodb connection string is not present");
}

if (!global.mongoose) {
  global.mongoose = { connection: null, promise: null };
}

const cachedConnection = global.mongoose;

const connectToDb = async () => {
  if (cachedConnection.connection) {
    return cachedConnection.connection;
  }
  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(MONGODB_URI)
      .then(() => mongoose.connection);
  }
  try {
    cachedConnection.connection = await cachedConnection.promise;
  } catch (error) {
    console.error(error);
    cachedConnection.promise = null;
    throw error;
  }
  return cachedConnection.connection;
};

export default connectToDb;
