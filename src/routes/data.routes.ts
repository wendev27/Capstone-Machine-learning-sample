import express from "express";
import {
  receiveData,
  getLatestData,
  getHistory,
} from "../contollers/data.controller";

const router = express.Router();

router.post("/", receiveData);
router.get("/latest", getLatestData);
router.get("/history", getHistory); // new endpoint

export default router;
