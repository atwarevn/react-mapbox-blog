import MapboxMap from "./components/MapboxMap.tsx";

function App() {
  // This can be reactive
  const points = [
    {
      coordinates: { lng: -74.5, lat: 40 },
      description: "Point A",
    },
    {
      coordinates: { lng: -74.6, lat: 40.1 },
      description: "Point B",
    },
    { coordinates: { lng: -74.4, lat: 39.9 }, description: "Point C" },
  ];

  return (
    <div>
      <h1>My Mapbox App</h1>
      <MapboxMap points={points} />
    </div>
  );
}

export default App;
