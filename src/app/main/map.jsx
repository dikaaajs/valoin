"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
var overlay = [];

const Map = (e) => {
  const [map, setMap] = useState(undefined);

  const selectedMap = "map/" + e.selectedMap + ".png";
  const locationMap = useRef();
  var bounds = [
    [-26.5, -25],
    [1021.5, 1023],
  ];

  // init map
  useEffect(() => {
    var southWest = L.latLng(-26, -25);
    var northEast = L.latLng(1025.5, 1023);

    const map = L.map(locationMap.current, {
      crs: L.CRS.Simple,
      maxZoom: 2,
      minZoom: 0,
      maxBounds: L.latLngBounds(southWest, northEast),
      maxBoundsViscosity: 4.0,
    }).fitBounds(bounds);
    setMap(map);
  }, []);

  if (map !== undefined) {
    let newMap = L.imageOverlay(selectedMap, bounds, { myLayerId: 1 }).addTo(
      map
    );
    overlay.push(newMap);
  }

  if (overlay[overlay.length - 2] !== undefined) {
    overlay[overlay.length - 2].remove();
  }
  useEffect(() => {
    // L.imageOverlay(selectedMap, bounds).addTo(map);
  }, [e]);

  return (
    <div
      id="map"
      ref={locationMap}
      className="w-full h-full !bg-[#16161A]"
    ></div>
  );
};

export default Map;
