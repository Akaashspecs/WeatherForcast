"use client";

import L, { LatLngLiteral } from "leaflet";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import icon from "leaflet/dist/images/marker-icon.png";

const Map = ({ lat, lon }: { lat?: number; lon?: number }) => {
  const [coord, setCoord] = useState<LatLngLiteral | null>(null);

  useEffect(() => {
    if (lat && lon) {
      setCoord({
        lat: lat,
        lng: lon,
      });
    }
    if (!lat && !lon && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoord({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const customIcon = L.icon({
    iconUrl: icon.src,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41],
  });

  return (
    <div className="border rounded-2xl overflow-hidden mt-3">
      {coord && (
        <MapContainer
          style={{
            height: "50vh",
            width: "30vw",
          }}
          center={coord}
          zoom={19}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            icon={customIcon}
            position={{ lat: coord.lat, lng: coord.lng }}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default Map;
