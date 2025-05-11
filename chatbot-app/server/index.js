require("dotenv").config();
const express = require("express");
const cors = require("cors");
const chatRoutes = require("./routes/chatRoutes");
const db = require("./config/db");

// Verify critical environment variables
if (!process.env.GEMINI_API_KEY) {
  console.error("FATAL: GEMINI_API_KEY is not defined in .env file");
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", chatRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
