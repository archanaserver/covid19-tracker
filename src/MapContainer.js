import React from "react";
import "./MapContainer.css";
import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

function MapContainer({ countries, casesType, center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* loop through all the countries and draw circle */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>
  );
}

export default MapContainer;
