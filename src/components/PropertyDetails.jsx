import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function PropertyDetails({ properties }) {
  const { id } = useParams();

  // Find the selected property
  const property = properties.find((p) => p.id === id);

  // Safety check
  if (!property) {
    return <p>Property not found</p>;
  }

  // Image gallery state
  const [mainImage, setMainImage] = useState(property.images[0]);

  // Tabs state
  const [activeTab, setActiveTab] = useState("description");

  // Favourites state
  const [favourites, setFavourites] = useState([]);

  // Load favourites from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(saved);
  }, []);

  // Toggle favourite
  function toggleFavourite() {
    let updated;

    if (favourites.includes(property.id)) {
      updated = favourites.filter((id) => id !== property.id);
    } else {
      updated = [...favourites, property.id];
    }

    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  }

  const isFavourite = favourites.includes(property.id);

  return (
    <div className="page">
      <div className="details-container">
        <h2>Property Details</h2>

        {/* MAIN IMAGE */}
        <img
          src={mainImage}
          className="gallery-main"
          alt="property"
          width="400"
        />

        {/* IMAGE THUMBNAILS */}
        <div className="gallery-thumbs">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="thumbnail"
              width="80"
              style={{ cursor: "pointer", margin: "5px" }}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
        <br />
        <div className="back-bar">
          <Link to="/">← Back to Search</Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;
