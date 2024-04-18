import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";

// Set your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiamhlbW1pbmdlciIsImEiOiJjbG1uZms3NnQwc2dhMmxwbmN6cnBtMDN5In0.beuY7ZjkZNydgYNkZhIGzw";

const MapboxMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 7,
      });

      // Cleanup function to remove the map instance on component unmount
      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "400px", width: "100%" }} />
  );
};

export default MapboxMap;
