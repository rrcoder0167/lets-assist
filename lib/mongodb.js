import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MONGODB");
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
};