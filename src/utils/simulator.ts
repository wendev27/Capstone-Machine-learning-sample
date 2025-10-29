import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

const INTERVAL = Number(process.env.SIMULATION_INTERVAL);

setInterval(async () => {
  const simulatedData = {
    waterLevel: Math.random() * 100,
    rainfall: Math.random() * 50,
    temperature: 25 + Math.random() * 10,
    timestamp: new Date().toISOString(),
  };

  try {
    await axios.post("http://localhost:5000/api/data", simulatedData);
    console.log("✅ Sent simulated data:", simulatedData);
  } catch (error) {
    console.error("❌ Error sending simulated data:", error);
  }
}, INTERVAL);
