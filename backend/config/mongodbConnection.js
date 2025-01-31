import mongoose from "mongoose";

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}

export { connectToDatabase };
