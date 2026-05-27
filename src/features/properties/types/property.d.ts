import { createPropertySchema } from "../schema/property.schema";

export interface LocationType {
    governorate: string;
    city?: string;
    street?: string;
}

export interface PropertyFilters {
    location?: LocationType[];
    purpose?: "sale" | "rent";
    type?: "apartment" | "villa" | "house" | "land" | "office" | "store";
    rooms?: string; // ex: "2+"
    price?: {
        min?: string;
        max?: string;
    }       // ex: "500000-1000000"
}




export type Property = {
    _id: string;

    title: string;
    description: string;
    price: number;
    pricePerMeter: number;
    area: number;
    purpose: "sale" | "rent";
    type: "villa" | "apartment" | string;
    status: "available" | "sold" | "rented" | string;

    paymentMethod: "cash" | "installment" | string;
    advertiserType: "owner" | "agent" | string;

    bedrooms: number;
    bathrooms: number;

    amenities: string[];

    views: number;

    location: {
        city: string;
        governorate: string;
        street: string;
        coordinates: {
            lat: number,
            lng: number
        }
    };

    listedBy: {
        _id: string
        name: string
        email: string
        role: string
    }

    images: {
        _id: string;
        path: string;
        relativePath: string;
    }[];

    featuredOrder?: number;

    createdAt: string;
    updatedAt: string;
};
export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;


export interface GetSinglePropertyResponse {
    property: Property
    relatedProperties: Property[]
}
