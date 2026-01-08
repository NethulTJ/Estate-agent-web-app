import { Routes, Route } from "react-router-dom";
import propertiesData from "./assets/data/properties.json";
import Search from "./components/Search";
import PropertyDetails from "./components/PropertyDetails";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Estate Agent Web App</h1>

      <Routes>
        <Route
          path="/"
          element={<Search properties={propertiesData.properties} />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails properties={propertiesData.properties} />}
        />
      </Routes>
    </div>
  );
}

export default App;
