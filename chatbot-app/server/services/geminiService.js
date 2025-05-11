const axios = require("axios");

const getGeminiResponse = async (message) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }

    // Create URL object to prevent manipulation
    const url = new URL(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
    );
    url.searchParams.set("key", apiKey);

    console.log("Making request to:", url.toString()); // Debug log

    const body = {
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    };

    const response = await axios.post(url.toString(), body, {
      headers: { "Content-Type": "application/json" },
      timeout: 10000,
    });

    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("Unexpected response format:", response.data);
      throw new Error("Unexpected response format from Gemini API");
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error Details:", {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(
      `Failed to get Gemini response: ${
        error.response?.data?.error?.message || error.message
      }`
    );
  }
};

module.exports = { getGeminiResponse };
