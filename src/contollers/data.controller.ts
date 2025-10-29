// src/controllers/dataController.ts
import { Request, Response } from "express";
import sensorDataModel from "../models/sensor.data.model";

export const receiveData = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    // payload.timestamp is ISO string — store as Date
    const doc = await sensorDataModel.create({
      waterLevel: payload.waterLevel,
      rainfall: payload.rainfall,
      temperature: payload.temperature,
      timestamp: payload.timestamp ? new Date(payload.timestamp) : new Date(),
      location: payload.location || undefined,
    });

    console.log("📥 Saved to DB:", doc._id);
    res.status(201).json({ message: "Data received and saved.", id: doc._id });
  } catch (error) {
    console.error("❌ Error saving data:", error);
    res.status(500).json({ message: "Failed to save data", error });
  }
};

export const getLatestData = async (req: Request, res: Response) => {
  try {
    const latestDoc = await sensorDataModel
      .findOne()
      .sort({ timestamp: -1 })
      .lean();
    if (!latestDoc) return res.status(404).json({ message: "No data yet." });
    res.json(latestDoc);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching latest data" });
  }
};

// New: get history (paginated)
export const getHistory = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 1000);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const skip = (page - 1) * limit;

    const docs = await sensorDataModel
      .find()
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    res.json({
      page,
      limit,
      count: docs.length,
      data: docs.reverse(), // reverse so oldest -> newest in response array
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching history" });
  }
};
