"use client";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L, { LatLngExpression } from "leaflet";
import { useState } from "react";

export interface Coordinates {
    lat: number;
    lng: number;
}

interface LocationPickerProps {
    value: Coordinates | null;
    onChange: (coords: Coordinates) => void;
}

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function LeafletLocationPicker({ value, onChange }: LocationPickerProps) {
    const [position, setPosition] = useState<Coordinates | null>(value);

    function LocationMarker() {
        useMapEvents({
            click(e) {
                const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
                setPosition(coords);
                onChange(coords);
            },
        });

        return position ? (
            <Marker position={[position.lat, position.lng] as LatLngExpression} icon={markerIcon} />
        ) : null;
    }

    return (
        <MapContainer
            center={[30.0444, 31.2357]}
            zoom={13}
            scrollWheelZoom={true}
            // style={{ height: "350px", width: "100%", borderRadius: "10px" }}
                className="h-[350px] w-screen rounded-xl"

        >
            <TileLayer
                attribution='© OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
        </MapContainer>
    );
}
