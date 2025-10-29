// src/models/SensorDataModel.ts
import { Schema, model, Document } from "mongoose";

export interface ISensorData extends Document {
  waterLevel: number;
  rainfall: number;
  temperature: number;
  timestamp: Date;
  location?: {
    lat?: number;
    lon?: number;
    sensorId?: string;
  };
}

const SensorDataSchema = new Schema<ISensorData>({
  waterLevel: { type: Number, required: true },
  rainfall: { type: Number, required: true },
  temperature: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  location: {
    lat: { type: Number },
    lon: { type: Number },
    sensorId: { type: String },
  },
});

export default model<ISensorData>("SensorData", SensorDataSchema);
