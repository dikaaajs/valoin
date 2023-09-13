"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const Map = () => {
  const locationMap = useRef();
  useEffect(() => {
    const southWest = L.latLng(-26, -25); // Koordinat sudut barat daya (latitude, longitude)
    const northEast = L.latLng(1025.5, 1023); // Koordinat sudut timur laut (latitude, longitude)
    const batas = L.latLngBounds(southWest, northEast);
    const map = L.map(locationMap.current, {
      crs: L.CRS.Simple,
      maxZoom: 2,
      minZoom: 0,
      maxBounds: batas,
      maxBoundsViscosity: 4.0,
    });
    const bounds = [
      [-26.5, -25],
      [1021.5, 1023],
    ];
    const mapOverlay = L.imageOverlay("map/ascent.png", bounds).addTo(map);
    map.fitBounds(bounds);

    const getBounds = mapOverlay.getBounds();
    console.log(getBounds);
    // pin section
    L.marker([-26, -25], {
      icon: L.icon({
        iconUrl: "image/displayicon 1.png",
        iconSize: [30, 30],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41],
      }),
    }).addTo(map);
  }, []);
  return <div id="map" ref={locationMap} className="w-full h-full"></div>;
};

export default Map;
