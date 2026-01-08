import { useState, useEffect } from "react";
import PropertyList from "./PropertyList";

function Search({ properties }) {
  //  SEARCH STATES (UNCHANGED)
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [postcode, setPostcode] = useState("");
  const [dateAdded, setDateAdded] = useState("");
  const [results, setResults] = useState(properties);

  //  FAVOURITES + TABS
  const [activeTab, setActiveTab] = useState("search");
  const [favourites, setFavourites] = useState([]);

  // Load favourites on page load
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(saved);
  }, []);

  function handleSearch() {
    let filtered = properties;

    if (type !== "") filtered = filtered.filter((p) => p.type === type);
    if (minPrice !== "") filtered = filtered.filter((p) => p.price >= minPrice);
    if (maxPrice !== "") filtered = filtered.filter((p) => p.price <= maxPrice);
    if (bedrooms !== "")
      filtered = filtered.filter((p) => p.bedrooms >= bedrooms);
    if (postcode !== "")
      filtered = filtered.filter((p) =>
        p.postcode.toLowerCase().includes(postcode.toLowerCase())
      );
    if (dateAdded !== "")
      filtered = filtered.filter((p) => p.dateAdded >= dateAdded);

    setResults(filtered);
  }

  //  REMOVE FROM FAVOURITES
  function removeFavourite(id) {
    const updated = favourites.filter((fid) => fid !== id);
    setFavourites(updated);
    localStorage.setItem("favourites", JSON.stringify(updated));
  }

  const favouriteProperties = properties.filter((p) =>
    favourites.includes(p.id)
  );

  return (
    <div className="page">
      {/*  TABS */}
      <div className="tabs">
        <button
          className={activeTab === "search" ? "active" : ""}
          onClick={() => setActiveTab("search")}
        >
          Search
        </button>

        <button
          className={activeTab === "favourites" ? "active" : ""}
          onClick={() => setActiveTab("favourites")}
        >
          Favourites ({favourites.length})
        </button>
      </div>

      {/*  SEARCH TAB */}
      {activeTab === "search" && (
        <div className="search-container">
          <h2>Search Properties</h2>

          <div className="search-fields">
            <div className="field">
              <label>Type:</label>
              <select onChange={(e) => setType(e.target.value)}>
                <option value="">Any</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="field">
              <label>Min Price:</label>
              <input
                type="number"
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Max Price:</label>
              <input
                type="number"
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Min Bedrooms:</label>
              <input
                type="number"
                onChange={(e) => setBedrooms(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Postcode:</label>
              <input
                type="text"
                onChange={(e) => setPostcode(e.target.value)}
              />
            </div>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            Search
          </button>

          <PropertyList properties={results} />
        </div>
      )}

      {/* FAVOURITES TAB */}
      {activeTab === "favourites" && (
        <div className="search-container">
          <h2>Your Favourites</h2>

          {favouriteProperties.length === 0 ? (
            <p>No favourites saved.</p>
          ) : (
            favouriteProperties.map((p) => (
              <div key={p.id} className="property-card">
                <img
                  src={p.images[0]}
                  alt="property"
                  className="property-card-img"
                />

                <div className="property-card-content">
                  <p className="property-title">{p.description}</p>
                  <p>£{p.price}</p>

                  <button onClick={() => removeFavourite(p.id)}>
                    ❌ Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
