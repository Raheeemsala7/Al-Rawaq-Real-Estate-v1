"use client";

import dynamic from "next/dynamic";
import { Coordinates } from "./LeafletLocationPicker.client";

const LeafletLocationPicker = dynamic(
    () => import("./LeafletLocationPicker.client"),
    {
        ssr: false, // 👈 أهم خطوة
    }
);

export default LeafletLocationPicker as React.FC<{
    value: Coordinates | null;
    onChange: (coords: Coordinates) => void;
}>;
