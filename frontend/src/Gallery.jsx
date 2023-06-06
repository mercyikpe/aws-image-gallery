import PropTypes from "prop-types";

function Gallery({ images }) {
  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Image Gallery</h1>
      {images.length === 0 ? (
        <>
          <p className="text-center text-xl mt-10 font-medium">
            No images available. <br /> Upload images
          </p>
        </>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.key} className="flex flex-col items-center">
              <img src={image.url} alt={image.key} className="mb-2" />
              <p>{image.key}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Gallery;
