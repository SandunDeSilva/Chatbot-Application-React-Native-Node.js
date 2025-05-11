const db = require("../config/db");
const { getGeminiResponse } = require("../services/geminiService");

const chat = async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "Message is required and must be a string" });
  }

  try {
    const response = await getGeminiResponse(message);

    // Properly await the database operation
    const [result] = await db.query(
      "INSERT INTO messages(user_message, bot_response) VALUES(?,?)",
      [message, response]
    );

    res.json({ response });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({
      error: "Failed to process your request",
      details: err.message,
    });
  }
};

module.exports = { chat };
