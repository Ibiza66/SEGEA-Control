import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  console.log("Intentando conectar...");

  const client = new MongoClient(process.env.MONGODB_URI!);

  try {
    await client.connect();
    console.log("✅ Conexión exitosa");
    await client.close();
  } catch (error) {
    console.error("❌ Error:");
    console.error(error);
  }
}

test();