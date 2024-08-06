const axios = require("axios");

async function checkContentStatus(content) {
  try {
    const response = await axios.post(`${process.env.FLASK_API}/analyze/analyze-content`, {
      content: content,
    });
    return response.data.status;
  } catch (error) {
    console.error("Error checking content status:", error.message);
    throw error;
  }
}

async function checkPhotoStatus(photo) {
  try {
    const response = await axios.post(`${process.env.FLASK_API}/analyze/analyze-image`, {
      image_url: photo,
    });
    return response.data.status;
  } catch (error) {
    console.error("Error checking photo status:", error.message);
    throw error;
  }
}

async function checkMediaStatus(content, photo) {
  try {
    const contentStatus = await checkContentStatus(content);
    const photoStatus = await checkPhotoStatus(photo);

    // If the content is negative, return "negative".
    // If the content is non-negative and the photo is negative, return "non-negative"
    // (for example, the content could be about a harmless topic but the photo might
    // contain potentially harmful elements like a knife in a food receipt photo).
    // Otherwise, return "non-negative".
    if (contentStatus === "negative") {
      return "negative";
    } else if (photoStatus === "negative") {
      return "non-negative";
    } else {
      return "non-negative";
    }
  } catch (error) {
    console.error("Error checking media status:", error.message);
    throw error;
  }
}

module.exports = { checkMediaStatus, checkContentStatus, checkPhotoStatus };
