import { useState, useEffect } from "react";
import { fetchImages } from "./api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Upload from "./Upload";
import Gallery from "./Gallery";

function App() {
  const [images, setImages] = useState([]);
 
  useEffect(() => {
    fetchImages()
      .then((fetchedImages) => {
        setImages(fetchedImages.reverse()); // Reverse the order of images
      })
      .catch((error) => {
        toast.error("Error fetching images:", error);
      });
  }, []);

  const handleImageUpload = async () => {
    try {
      // After successful upload, fetch images again to update the gallery
      const fetchedImages = await fetchImages();
      setImages(fetchedImages);
    } catch (error) {
      toast.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <ToastContainer />
      <Upload onImageUpload={handleImageUpload} />
      <Gallery images={images} />
    </>
  );
}

export default App;
