"use client";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
var overlay = [];

const Map = (e) => {
  const [map, setMap] = useState(undefined);
  const editCondition = e.edit ? true : false;
  const img = e.img;
  const lineup = e.lineup;

  const selectedMap = "/map/" + e.selectedMap + ".png";
  const locationMap = useRef();
  var bounds = [
    [-26.5, -25],
    [1021.5, 1023],
  ];

  // variabel untuk markup
  let markFrom = [];
  let markFor = [];

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

    if (editCondition) {
      map.on("click", (event) => {
        markLineUp(event);
      });
    }

    setMap(map);
    const markLineUp = (event, condition) => {
      let coordinat = [event.latlng.lat, event.latlng.lng];
      console.log(coordinat);
      const lineUpCondition = localStorage.getItem("lineUpCondition");

      if (lineUpCondition === "from") {
        if (markFrom !== null) {
          map.removeLayer(markFrom);
        }
        markFrom = L.marker([coordinat[0], coordinat[1]], {
          icon: L.icon({
            iconUrl: img.agentImg,
            iconSize: [30, 30],
          }),
        }).addTo(map);
        localStorage.setItem("coordinatFrom", JSON.stringify(coordinat));
        return;
      }

      if (lineUpCondition === "for") {
        if (markFor !== null) {
          map.removeLayer(markFor);
        }
        markFor = L.marker([coordinat[0], coordinat[1]], {
          icon: L.icon({
            iconUrl: img.abilityImg,
            iconSize: [30, 30],
          }),
        }).addTo(map);
        localStorage.setItem("coordinatFor", JSON.stringify(coordinat));
        return;
      }
    };
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

  // set the pin
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
