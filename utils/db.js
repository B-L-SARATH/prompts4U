import mongoose from "mongoose";

let isconnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);
  if (isconnected) {
    console.log("mongodb is already connected");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected `);
    isconnected = true;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
