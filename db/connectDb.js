import mongoose from "mongoose";

let isConnected = false; // track connection state across hot reloads

const connectDb = async () => {
  if (isConnected) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error; // let the caller decide what to do, don't kill the process
  }
};

export default connectDb;