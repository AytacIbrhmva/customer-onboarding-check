const axios = require("axios");

// Function to check content status using the Flask API
async function checkMediaStatus(content) {
  try {
    const response = await axios.post("http://139.59.215.66:8080/analyze/analyze-content", {
      content: content,
    });
    if (response.data.status === "negative") {
      return "dangerous";
    } else {
      return "safe";
    }
  } catch (error) {
    console.error("Error checking media status:", error.message);
    throw error;
  }
}

module.exports = { checkMediaStatus };
