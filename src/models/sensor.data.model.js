// src/models/SensorDataModel.ts
import { Schema, model, Document } from "mongoose";

import mongoose from "mongoose";

const SensorDataSchema = new mongoose.Schema({
  sensorId: String,
  location: String,
  waterLevel: Number,
  timestamp: Date,
});

const SensorData = mongoose.model("SensorData", SensorDataSchema);
export default SensorData;
