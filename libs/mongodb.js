import mongoose from "mongoose";

const connectMongoDB = async (database) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI + database);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;
