const axios = require("axios");

async function checkMediaStatus(content) {
  try {
    const response = await axios.post(`${process.env.FLASK_API}/analyze/analyze-content`, {
      content: content,
    });
    return response.data.status;
  } catch (error) {
    console.error("Error checking media status:", error.message);
    throw error;
  }
}

module.exports = { checkMediaStatus };
