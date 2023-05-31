import axios from "axios";

export const fetchImages = async () => {
  try {
    const response = await axios.get("http://localhost:3001/images");
    return response.data.images;
  } catch (error) {
    throw new Error("Error fetching images: " + error);
  }
};
