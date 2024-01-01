import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const Connection = () => {
  const DB_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-eewepid-shard-00-00.mpzi943.mongodb.net:27017,ac-eewepid-shard-00-01.mpzi943.mongodb.net:27017,ac-eewepid-shard-00-02.mpzi943.mongodb.net:27017/?ssl=true&replicaSet=atlas-3xxkgn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=AtlasApp`;



  try {
    mongoose.connect(DB_URI, { useNewUrlParser: true });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(`Error while Connecting with Database `, error.message);
  }
};

export default Connection;
