import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dataRoutes from "./routes/data.routes";
import { connectDB } from "./mongoose/db";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/data", dataRoutes);

const PORT = process.env.PORT;

const start = async () => {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`✅ SmartFlood API running on port ${PORT}`)
  );
};

start();
