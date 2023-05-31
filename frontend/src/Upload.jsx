import { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

function Upload({ onImageUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleFileDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      setIsLoading(true); // Set isLoading to true

      await axios.post("http://localhost:3001/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSelectedFile(null);
      toast.success("Image uploaded successfully!");

      onImageUpload(); // Call the provided onImageUpload callback to update the gallery
    } catch (error) {
      toast.error("Error uploading image:", error);
    } finally {
      setIsLoading(false); // Set isLoading back to false after the upload is done
    }
  };

  return (
    <main className="App max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center py-8">Image Upload</h1>
      <div className="flex items-center justify-around">
        <Dropzone onDrop={handleFileDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps({
                className:
                  "dropzone border-2 border-dashed border-gray-400 rounded-md p-4 mb-4",
              })}
            >
              <input {...getInputProps()} />
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected File"
                  className="max-w-full h-auto mb-4"
                />
              ) : (
                <p className="text-gray-500">
                  Drag and drop an image file here, or click to select
                </p>
              )}
            </div>
          )}
        </Dropzone>
        <button
          onClick={handleFileUpload}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ml-6"
          disabled={isLoading} // Disable the button when isLoading is true
        >
          {isLoading ? "Uploading..." : "Upload"} {/* Display "Uploading..." when isLoading is true */}
        </button>
      </div>
    </main>
  );
}

Upload.propTypes = {
  onImageUpload: PropTypes.func.isRequired
};

export default Upload;
