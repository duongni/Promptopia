import mongoose from "mongoose";

let isConnected = false; //track the connecttion

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  //if we not connected, we will open up a try and catch statement
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_promp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
