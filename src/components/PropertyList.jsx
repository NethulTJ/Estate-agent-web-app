import { Link } from "react-router-dom";

function PropertyList({ properties }) {
  return (
    <div className="page">
      {properties.map((p) => (
        <div key={p.id} className="property-card">
          {/* PROPERTY IMAGE */}
          <img src={p.images[0]} alt="property" className="property-card-img" />

          <div className="property-card-content">
            <p className="property-title">{p.description}</p>
            <p>£{p.price}</p>
            <p>
              {p.bedrooms} bedrooms · {p.type}
            </p>

            <Link className="view-link" to={`/property/${p.id}`}>
              View Property -
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PropertyList;
