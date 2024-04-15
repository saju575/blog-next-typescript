import mongoose from "mongoose";
import { MONGODB_URL } from "../secret";

/* 
    establish connection with mongoDB Database
*/
const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(MONGODB_URL, options);

    console.info("Connected to MongoDB successfully");

    mongoose.connection.on("error", (err) => {
      throw new Error(err.message);
    });
  } catch (error: any) {
    console.error(error.message);
  }
};

export default connectDB;
