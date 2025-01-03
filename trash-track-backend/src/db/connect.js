import mongoose from "mongoose";
const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, { dbName: "trash-track" });
    const db = mongoose.connection;
    db.on("connected", () => {
      console.log(`Database connection established on host ${db.host}`);
    });
    db.on("error", () => {
      console.log("Database connection failed");
    });
    db.on("disconnected", () => {
      console.log("Database connection disconnected");
    });
    db.on("reconnected", () => {
      console.log("Database connection reconnected");
    });
  } catch (error) {
    console.log("database connection failed: ", error.message);
  }
};
export default connectDB;
