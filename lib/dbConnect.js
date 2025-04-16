import mongoose from "mongoose";

const connection = {};

const dbConnect = async () => {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || "", {});

    connection.isConnected = true;

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed", error);

    throw new Error("Failed to connect Database");
  }
};

export default dbConnect;
