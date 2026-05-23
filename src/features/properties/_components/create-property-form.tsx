"use client"
import { Controller, useForm } from 'react-hook-form'
import { CreatePropertyFormData } from '../types/property'
import { zodResolver } from '@hookform/resolvers/zod'
import { createPropertySchema } from '../schema/property.schema'
import { Field, FieldError, FieldLabel } from '@/shared/components/ui/field'
import { Input } from '@/shared/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Textarea } from '@/shared/components/ui/textarea'
import LeafletLocationPicker from './LeafletLocationPicker'
import { Button } from '@/shared/components/ui/button'
import { useState, useTransition } from 'react'
import { UploadFileField } from './ImageUploadField'
import { useCreatePropertyMutation } from '../hooks/property-hook'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const amenitiesOptions = [
    "مصعد",
    "جراج",
    "أمن 24 ساعة",
    "غاز طبيعي",
    "عداد كهرباء",
    "عداد مياه",
    "تكييف",
    "مطبخ",
    "بلكونة",
    "إنترنت",
]

const CreatePropertyForm = () => {

    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm<CreatePropertyFormData>({
        resolver: zodResolver(createPropertySchema),
        defaultValues: {
            title:"شقة للإيجار في البنفسج عمارات – التجمع الخامس",
            description: "",
            price: 455,
            pricePerMeter: 455,
            area: 5445,
            location: {
                governorate: "الإسكندرية",
                city: "",
                street: "",
                coordinates: {
                    lat: 31.2001,
                    lng: 29.9187,
                },
            },
            amenities: [],
            details: {
                view: "الإطلالة علي البحر",
                listingCode: "RWQ-001",
            },
            type: "apartment",
            purpose: "rent",
            paymentMethod: "cash",
            advertiserType: "owner",
            status: "pending",
        }
    })

    const { mutateAsync } = useCreatePropertyMutation()



    const [previews, setPreviews] = useState<string[]>(() => {
        const images = form.getValues("images") || [];
        return images.map((file: File) => URL.createObjectURL(file));
    });

    const onSubmit = async (data: CreatePropertyFormData) => {
        startTransition(async () => {
            await mutateAsync(data)
            toast.success("Done sucessfully create property")
            form.reset()
            router.push("/dashboard/properties")
        })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                    control={form.control}
                    name='title'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                العنوان
                            </FieldLabel>
                            <Input
                                className="rounded-xl px-3 py-2 border border-[#E5E7EB] font-mono"
                                type="text"
                                placeholder="العنوان"
                                {...field}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='purpose'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className=" text-sm font-medium">
                                Purpose <span className='text-destructive'>*</span>
                            </FieldLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="purpose" className='w-full'>
                                    <SelectValue placeholder="Select purpose" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sale">Sale</SelectItem>
                                    <SelectItem value="rent">Rent</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
            </div>
            <Controller
                control={form.control}
                name='description'
                render={({ field, fieldState }) => (
                    <Field>
                        <FieldLabel className="font-mono">
                            الوصف
                        </FieldLabel>
                        <Textarea placeholder="Describe your property..."
                            className="min-h-[120px]   placeholder-muted-foreground"  {...field} value={field.value || ""}
                        />
                        {fieldState.invalid && (
                            <FieldError
                                className="text-red-500"
                                errors={[fieldState.error]}
                            />
                        )}
                    </Field>
                )}
            />

            <div className="flex gap-4">
                <Controller
                    control={form.control}
                    name='type'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                الوصف
                            </FieldLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="type" className='w-full'>
                                    <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="apartment">شقه</SelectItem>
                                    <SelectItem value="villa">فيلا</SelectItem>
                                    <SelectItem value="land">أرض</SelectItem>
                                    <SelectItem value="office">مكتب</SelectItem>
                                    <SelectItem value="store">محل</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='advertiserType'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                نوع المعلن
                            </FieldLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger id="advertiserType" className='w-full'>
                                    <SelectValue placeholder="اختار نوع المعلن" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="owner">مالك</SelectItem>
                                    <SelectItem value="agent">سمسار</SelectItem>
                                    <SelectItem value="developer">مطور</SelectItem>
                                </SelectContent>
                            </Select>
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
            </div>

            <div className="flex gap-4">
                <Controller
                    control={form.control}
                    name='bedrooms'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                عدد غرف النوم
                            </FieldLabel>
                            <Input type='number' placeholder='3' className="border border-input   placeholder-muted-foreground"
                                autoComplete={"off"} {...field} value={field.value}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='bathrooms'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                عدد الحمامات
                            </FieldLabel>
                            <Input type='number' placeholder='2' className="border border-input   placeholder-muted-foreground"
                                autoComplete={"off"} {...field} value={field.value || ""}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
            </div>
            <div className="space-y-3">
                <h4 className="text-2xl font-semibold">
                    المميزات والخدمات
                </h4>

                <Controller
                    control={form.control}
                    name="amenities"
                    render={({ field }) => (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {amenitiesOptions.map((item) => {
                                const checked = field.value?.includes(item)

                                return (
                                    <label
                                        key={item}
                                        className="flex items-center gap-2 border rounded-xl p-3 cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    field.onChange([
                                                        ...(field.value || []),
                                                        item,
                                                    ])
                                                } else {
                                                    field.onChange(
                                                        field.value.filter(
                                                            (value: string) => value !== item
                                                        )
                                                    )
                                                }
                                            }}
                                        />

                                        <span>{item}</span>
                                    </label>
                                )
                            })}
                        </div>
                    )}
                />
            </div>

            <div className="space-y-4">
                <h4 className="text-2xl font-semibold">
                    تفاصيل إضافية
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <Controller
                        control={form.control}
                        name="details.view"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>
                                    الإطلالة
                                </FieldLabel>

                                <Input
                                    placeholder="مثال: تطل على البحر"
                                    {...field}
                                    value={field.value || ""}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        control={form.control}
                        name="details.listingCode"
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>
                                    كود الإعلان
                                </FieldLabel>

                                <Input
                                    placeholder="مثال: RWQ-001"
                                    {...field}
                                    value={field.value || ""}
                                />

                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />

                </div>
            </div>

            <div className="flex gap-4 flex-wrap flex-col sm:flex-row">
                <Controller
                    control={form.control}
                    name='price'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                السعر
                            </FieldLabel>
                            <Input type='number' placeholder='250000' className="border border-input   placeholder-muted-foreground"
                                autoComplete={"off"} {...field} value={field.value || ""}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='area'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                المساحة (m²)
                            </FieldLabel>
                            <Input type='number' placeholder='250000' className="border border-input   placeholder-muted-foreground"
                                autoComplete={"off"} {...field} value={field.value || ""}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
                <Controller
                    control={form.control}
                    name='pricePerMeter'
                    render={({ field, fieldState }) => (
                        <Field>
                            <FieldLabel className="font-mono">
                                سعر كل متر (EGP/m²)
                            </FieldLabel>
                            <Input type='number' placeholder='250000' className="border border-input   placeholder-muted-foreground"
                                autoComplete={"off"} {...field} value={field.value || ""}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />
            </div>


            <div className='space-y-3 relative'>
                <h4 className='text-2xl font-semibold'>Location</h4>

                <div className="flex gap-4 flex-col sm:flex-row">
                    <Controller
                        control={form.control}
                        name='location.street'
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="font-mono">
                                    الشارع
                                </FieldLabel>
                                <Input type='text' placeholder='شارع / عنوان' {...field} value={field.value || ""}
                                    autoComplete="off" />
                                {fieldState.invalid && (
                                    <FieldError
                                        className="text-red-500"
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='location.city'
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="font-mono">
                                    المدينة
                                </FieldLabel>
                                <Input type='text' placeholder='المدينة' {...field}
                                    value={field.value || ""}
                                    autoComplete="off" />
                                {fieldState.invalid && (
                                    <FieldError
                                        className="text-red-500"
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />
                    <Controller
                        control={form.control}
                        name='location.governorate'
                        render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel className="font-mono">
                                    المحافظه
                                </FieldLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger className='w-full'>
                                        <SelectValue placeholder="Select Governorate" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="القاهرة">القاهرة</SelectItem>
                                        <SelectItem value="الجيزة">الجيزة</SelectItem>
                                        <SelectItem value="الإسكندرية">الإسكندرية</SelectItem>
                                        <SelectItem value="القليوبية">القليوبية</SelectItem>
                                        <SelectItem value="الدقهلية">الدقهلية</SelectItem>
                                        <SelectItem value="المنوفية">المنوفية</SelectItem>
                                        <SelectItem value="البحيرة">البحيرة</SelectItem>
                                        <SelectItem value="كفر الشيخ">كفر الشيخ</SelectItem>
                                        <SelectItem value="سوهاج">سوهاج</SelectItem>
                                        <SelectItem value="أسيوط">أسيوط</SelectItem>
                                        <SelectItem value="أسوان">أسوان</SelectItem>
                                        <SelectItem value="الأقصر">الأقصر</SelectItem>
                                        <SelectItem value="دمياط">دمياط</SelectItem>
                                        <SelectItem value="الفيوم">الفيوم</SelectItem>
                                        <SelectItem value="بورسعيد">بورسعيد</SelectItem>
                                        <SelectItem value="الإسماعيلية">الإسماعيلية</SelectItem>
                                        {/* أضف أي محافظات إضافية هنا */}
                                    </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                    <FieldError
                                        className="text-red-500"
                                        errors={[fieldState.error]}
                                    />
                                )}
                            </Field>
                        )}
                    />

                </div>
                <Controller
                    control={form.control}
                    name=''
                    render={({ field, fieldState }) => (
                        <div className='w-full space-y-2 pt-6 pb-8'>
                            <FieldLabel className="font-mono">
                                حدد العنوان
                            </FieldLabel>
                            <LeafletLocationPicker
                                value={{
                                    lat: form.watch("location.coordinates.lat") ?? 0,
                                    lng: form.watch("location.coordinates.lng") ?? 0,
                                }}
                                onChange={(coords) => {
                                    form.setValue("location.coordinates.lat", coords.lat, { shouldValidate: true });
                                    form.setValue("location.coordinates.lng", coords.lng, { shouldValidate: true });
                                }}
                            />
                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </div>
                    )}
                />
            </div>

            <UploadFileField form={form} previews={previews} setPreviews={setPreviews} />
            <div className="flex gap-4 flex-col sm:flex-row">

                <Controller
                    control={form.control}
                    name='paymentMethod'
                    render={({ field, fieldState }) => (
                        <Field className="w-full flex-1">
                            <FieldLabel className="font-mono">
                                طريقة الدفع
                            </FieldLabel>

                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger
                                    id="paymentMethod"
                                    className='w-full'
                                >
                                    <SelectValue placeholder="اختر طريقة الدفع" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="cash">
                                        كاش
                                    </SelectItem>

                                    <SelectItem value="installments">
                                        تقسيط
                                    </SelectItem>

                                    <SelectItem value="bank-financing">
                                        تمويل بنكي
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />

                <Controller
                    control={form.control}
                    name='status'
                    render={({ field, fieldState }) => (
                        <Field className="w-full flex-1">
                            <FieldLabel className="font-mono">
                                الحالة
                            </FieldLabel>

                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <SelectTrigger
                                    id="status"
                                    className='w-full'
                                >
                                    <SelectValue placeholder="اختر الحالة" />
                                </SelectTrigger>

                                <SelectContent side='inline-end' className={"Z-[1000] relative"}>
                                    <SelectItem value="available">
                                        متاح
                                    </SelectItem>

                                    <SelectItem value="sold">
                                        تم البيع
                                    </SelectItem>

                                    <SelectItem value="rented">
                                        مؤجر
                                    </SelectItem>

                                    <SelectItem value="pending">
                                        قيد المراجعة
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            {fieldState.invalid && (
                                <FieldError
                                    className="text-red-500"
                                    errors={[fieldState.error]}
                                />
                            )}
                        </Field>
                    )}
                />

            </div>

            <Button type="submit" className='w-full' variant="default" disabled={isPending}>
                {isPending ?? <Loader2 className='w-5 h-5 animate-spin' />}
                انشاء عقار
            </Button>

        </form>
    )
}

export default CreatePropertyForm