import z from "zod";

export const createPropertySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    price: z.coerce.number().min(1, "Price must be a positive number"),
    purpose: z.enum(["sale", "rent"]),
    pricePerMeter: z.coerce.number(),
    area: z.coerce.number(),
    location: z.object({
        street: z.string().optional(),
        city: z.string().optional(), // اختياري لأن المستخدم ممكن يتركه فارغ في بعض الحالات
        governorate: z.enum([
            "القاهرة",
            "الجيزة",
            "الإسكندرية",
            "المنوفية",
            "الفيوم",
            "أسوان",
            "سوهاج",
            "الأقصر",
            "أسيوط",
            "دمياط",
            "بورسعيد",
            "الإسماعيلية",
            "البحيرة",
            "المنصورة",
            "كفر الشيخ"
        ]), // المحافظات المتاحة
        coordinates: z.object({
            lat: z.coerce.number().optional(),
            lng: z.coerce.number().optional(),
        }),
    }),
    images: z.array(z.instanceof(File)).optional(),
    type: z.enum(["apartment", "villa", "land", "office", "store"]),
    paymentMethod: z.enum(["cash", "installments", "bank-financing"]),
    advertiserType: z.enum(["owner", "agent", "developer"]),
    status: z.enum(["available", "sold", "rented", "pending"]),
    listedBy: z.string().optional(),
    bedrooms: z.coerce.number().min(1, "Badrooms is required"),
    bathrooms: z.coerce.number().min(1, "Bathrooms is required"),

});