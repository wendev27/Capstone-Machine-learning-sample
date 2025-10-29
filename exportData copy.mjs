import mongoose from "mongoose";
import fs from "fs";
import dotenv from "dotenv";
import SensorData from "./dist/models/sensor.data.model.ts";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

(async () => {
  const data = await SensorData.find(
    {},
    { _id: 0, rainfall: 1, waterLevel: 1, timestamp: 1 }
  );
  const csv = ["rainfall,waterLevel,timestamp"];

  data.forEach((d) => {
    csv.push(`${d.rainfall},${d.waterLevel},${d.timestamp}`);
  });

  fs.writeFileSync("sensor_data.csv", csv.join("\n"));
  console.log("✅ Exported data to sensor_data.csv");

  mongoose.connection.close();
})();
