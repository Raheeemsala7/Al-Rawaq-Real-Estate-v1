"use client";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Image from "next/image";

interface PropertyMapModalProps {
    address: string;
    coordinates: { lat: number; lng: number };
}

const markerIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

export default function PropertyMapModal({ address, coordinates }: PropertyMapModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <div className="bg-white p-4 rounded-lg shadow-md  relative h-48 flex justify-center items-center">
                <Image src={"/assets/placeholder-full.jpg"} className="absolute inset-0 size-full" fill alt="placeholder" />
                <div className="relative w-full z-20 flex justify-between items-center bg-white p-4 rounded-lg shadow-md ">
                    <div className="flex gap-2 items-center text-[#333]">
                        <span>📍 </span>
                        <p className="text-sm">{address}</p>
                    </div>
                    <DialogTrigger>
                        <Button variant="outline" size="sm">مشاهدة على الخريطة</Button>
                    </DialogTrigger>
                </div>
            </div>

            <DialogContent className="w-full h-screen p-0 m-0 max-w-full max-h-full !block" style={{ maxWidth: '100%' }}>
                <DialogHeader className="h-fit p-4 ">
                    <DialogTitle className="text-lg text-right">موقع العقار</DialogTitle>

                </DialogHeader>
                <MapContainer
                    center={[coordinates.lat, coordinates.lng]}
                    zoom={16}
                    style={{ width: "100%", height: "calc(100% - 60px)" }}
                >
                    <TileLayer
                        attribution='© OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[coordinates.lat, coordinates.lng]} icon={markerIcon} />
                </MapContainer>
            </DialogContent>
        </Dialog >
    );
}
