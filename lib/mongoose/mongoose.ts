import mongoose from "mongoose";

export async function initMongoose() {
  console.log("Trying to connect to MongoDB...");

  // Eğer mongoose zaten bağlıysa (readyState === 1), tekrar bağlanmaya gerek yok
  /*   
    mongoose.connection.readyState:
    0: disconnected
    1: connected
    2: connecting
    3: disconnecting 
   */

  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB.");
    return mongoose.connection.asPromise(); // Mevcut bağlantıyı döner
  }

  try {
    if (process.env.NEXT_PUBLIC_MONGODB_URI) {
      await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI);
      console.log("Connected to MongoDB ✅");
    } else {
      console.log("ERR [initMongoose] NEXT_PUBLIC_MONGODB_URI bulunamadı : ");
    }
  } catch (err) {
    console.error("MongoDB connection error ❌: ", err);
  }
}
