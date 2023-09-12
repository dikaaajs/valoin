"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const Map = () => {
  const locationMap = useRef();
  useEffect(() => {
    const map = L.map(locationMap.current, {
      crs: L.CRS.Simple,
      maxZoom: 2,
      minZoom: 0,
    });
    const bounds = [
      [-26.5, -25],
      [1021.5, 1023],
    ];
    L.imageOverlay("map2.png", bounds).addTo(map);
    map.fitBounds(bounds);
  }, []);
  return <div id="map" ref={locationMap} className="w-full h-full"></div>;
};

export default Map;
