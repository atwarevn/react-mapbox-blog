import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";

// Set your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiamhlbW1pbmdlciIsImEiOiJjbG1uZms3NnQwc2dhMmxwbmN6cnBtMDN5In0.beuY7ZjkZNydgYNkZhIGzw";

type MapboxMapProps = {
  readonly points: {
    readonly coordinates: LngLatLike;
    readonly description: string;
  }[];
};

const MapboxMap = (props: MapboxMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>();
  const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (mapContainerRef.current) {
      map.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-74.006, 40.7128],
        zoom: 7,
      });

      // Cleanup function to remove the map instance on component unmount
      return () => {
        map.current?.remove();
      };
    }
  }, []);

  useEffect(() => {
    setMarkers(
      props.points.map((point) => {
        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${point.description}</h3>`,
        );
        return new mapboxgl.Marker()
          .setLngLat(point.coordinates)
          .setPopup(popup);
      }),
    );
  }, [props.points]);

  useEffect(() => {
    if (map.current) {
      markers.forEach((marker) => marker.addTo(map.current!));
    }

    return () =>
      markers.forEach((marker) => {
        marker.remove();
      });
  }, [markers]);

  return (
    <div ref={mapContainerRef} style={{ height: "600px", width: "100%" }} />
  );
};

export default MapboxMap;
