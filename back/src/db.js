import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://karla:RNQ8zXkhUcSQM5rP@cluster0.jhch9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    console.log("MongoDB is connected");
  } catch (error) {
    console.error(error);
  }
};
