import dns from "node:dns";

dns.setServers(["1.1.1.1", "1.0.0.1"]);

import dotenv from "dotenv";


dotenv.config();

import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  });
}

startServer();