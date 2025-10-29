import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import SensorData from "./src/models/sensor.data.model.js"; // update path if needed

dotenv.config();

const MONGO_URI = "mongodb://localhost:27017/smartflood";

if (!MONGO_URI) {
  console.error("❌ MONGODB_URI is not defined in .env");
  process.exit(1);
}

(async () => {
  try {
    // ✅ Connect properly
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");

    // Fetch all data
    const data = await SensorData.find({}).lean();

    if (!data.length) {
      console.log("⚠️ No data found in database.");
      process.exit(0);
    }

    // Save as JSON
    const outputDir = path.resolve("./ml_data");
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

    const filePath = path.join(outputDir, "sensor_data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log(`✅ Exported ${data.length} records to ${filePath}`);

    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error exporting data:", err);
    process.exit(1);
  }
})();
