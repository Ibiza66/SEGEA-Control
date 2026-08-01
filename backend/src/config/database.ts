import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    console.log("✅ MongoDB conectado correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB");
    console.error(error);
    process.exit(1);
  }
}