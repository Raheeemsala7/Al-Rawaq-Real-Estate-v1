"use client"
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Bath, Bed, Building2, ChevronLeft, ChevronRight, Eye, ImageIcon, Loader2, MapPin, Maximize, Pencil, Search, Trash2 } from 'lucide-react'
import React, { useState, useTransition } from 'react'
import { useDeletePropertyMutation, useGetAdminProperties } from '../hooks/property-hook'
import { Property } from '../types/property'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table'
import { Badge } from '@/shared/components/ui/badge'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/components/ui/dialog'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

const propertyTypeLabels: Record<string, string> = {
    apartment: "شقة",
    villa: "فيلا",
    house: "منزل",
    land: "أرض",
    office: "مكتب",
    store: "محل",
};

const statusLabels: Record<string, string> = {
    available: "متاح",
    sold: "مُباع",
    rented: "مؤجر",
    pending: "قيد المراجعة",
};

const purposeLabels: Record<string, string> = {
    sale: "للبيع",
    rent: "للإيجار",
};

const paymentLabels: Record<string, string> = {
    cash: "كاش",
    installments: "تقسيط",
    "bank-financing": "تمويل بنكي",
};

const advertiserLabels: Record<string, string> = {
    owner: "مالك",
    broker: "وسيط",
    developer: "مطور",
};


const AdminPropertiesTable = () => {
    const searchParams = useSearchParams()
    const [isPending, startTranstion] = useTransition()
    const [search, setSearch] = useState("");
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const page = searchParams.get("page") || 1
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [typeFilter, setTypeFilter] = useState<string>("all");
    const router = useRouter()
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

    const { data, isLoading: isLoadingProperties } = useGetAdminProperties();
    const { mutateAsync: deleteProperty } = useDeletePropertyMutation();

    if (isLoadingProperties) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-muted-foreground">جاري تحميل البيانات...</p>
                </div>
            </div>
        );
    }

    if (!data?.data) {
        return <h4>not Found</h4>
    }

    const properties = data.data || [];
    console.log(properties)

    // Filter properties based on search and filters
    const filteredProperties = properties.filter((property: Property) => {
        const matchesSearch =
            property.title.toLowerCase().includes(search.toLowerCase()) ||
            property.location.city.toLowerCase().includes(search.toLowerCase()) ||
            property.location.governorate.toLowerCase().includes(search.toLowerCase());

        const matchesStatus = statusFilter === "all" || property.status === statusFilter;
        const matchesType = typeFilter === "all" || property.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
    });

    const handleDelete = (propertyId: string) => {
        console.log(propertyId)
        startTranstion(async () => {
            const payload = await deleteProperty(propertyId)
            if (payload.success) {
                toast.success(payload.message)
                setDeleteDialogOpen(false)
                return
            }
            toast.error(payload.message)

        })
    };

    const handleEdit = (property: Property) => {
        console.log("Editing property:", property._id);
        // TODO: Open edit modal
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case "available":
                return "verified";
            case "sold":
                return "admin";
            case "rented":
                return "buyer";
            case "pending":
                return "warning";
            default:
                return "secondary";
        }
    };

    const formatPrice = (price: number, purpose: string) => {
        const formatted = new Intl.NumberFormat("ar-EG").format(price);
        return purpose === "rent" ? `${formatted} جنيه/شهر` : `${formatted} جنيه`;
    };

    const getStats = () => {
        const available = properties.filter((p: Property) => p.status === "available").length;
        const sold = properties.filter((p: Property) => p.status === "sold").length;
        const rented = properties.filter((p: Property) => p.status === "rented").length;
        const pending = properties.filter((p: Property) => p.status === "pending").length;
        return { available, sold, rented, pending, total: properties.length };
    };

    const stats = getStats();
    return (
        <div className='space-y-6'>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <div className="rounded-xl bg-card p-4 shadow-card border border-border/50">
                    <p className="text-xs text-muted-foreground">إجمالي العقارات</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="rounded-xl bg-success/10 p-4 shadow-card border border-success/20">
                    <p className="text-xs text-success">متاح</p>
                    <p className="text-2xl font-bold text-success">{stats.available}</p>
                </div>
                <div className="rounded-xl bg-primary/10 p-4 shadow-card border border-primary/20">
                    <p className="text-xs text-primary">مُباع</p>
                    <p className="text-2xl font-bold text-primary">{stats.sold}</p>
                </div>
                <div className="rounded-xl bg-blue-500/10 p-4 shadow-card border border-blue-500/20">
                    <p className="text-xs text-blue-600">مؤجر</p>
                    <p className="text-2xl font-bold text-blue-600">{stats.rented}</p>
                </div>
                <div className="rounded-xl bg-warning/10 p-4 shadow-card border border-warning/20">
                    <p className="text-xs text-warning">قيد المراجعة</p>
                    <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                </div>
            </div>

            {/* Main Card */}
            <Card className="shadow-soft border-0">
                <CardHeader className="border-b border-border/50 pb-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle className="text-lg font-semibold">
                            قائمة العقارات
                        </CardTitle>

                        {/* Filters */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="relative">
                                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="البحث عن عقار..."
                                    // value={search}
                                    // onChange={(e) => setSearch(e.target.value)}
                                    className="pr-10 bg-background w-full sm:w-[200px]"
                                />
                            </div>

                            <Select>
                                <SelectTrigger className="w-full sm:w-[140px] bg-background">
                                    <SelectValue placeholder="نوع العقار" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">جميع الأنواع</SelectItem>
                                    <SelectItem value="apartment">شقة</SelectItem>
                                    <SelectItem value="villa">فيلا</SelectItem>
                                    <SelectItem value="house">منزل</SelectItem>
                                    <SelectItem value="land">أرض</SelectItem>
                                    <SelectItem value="office">مكتب</SelectItem>
                                    <SelectItem value="store">محل</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select>
                                <SelectTrigger className="w-full sm:w-[140px] bg-background">
                                    <SelectValue placeholder="الحالة" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">جميع الحالات</SelectItem>
                                    <SelectItem value="available">متاح</SelectItem>
                                    <SelectItem value="sold">مُباع</SelectItem>
                                    <SelectItem value="rented">مؤجر</SelectItem>
                                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-table-header hover:bg-table-header">
                                    <TableHead className="text-right font-semibold min-w-[200px]">العقار</TableHead>
                                    <TableHead className="text-right font-semibold">الموقع</TableHead>
                                    <TableHead className="text-center font-semibold">النوع</TableHead>
                                    <TableHead className="text-center font-semibold">الغرض</TableHead>
                                    <TableHead className="text-center font-semibold">السعر</TableHead>
                                    <TableHead className="text-center font-semibold">المساحة</TableHead>
                                    <TableHead className="text-center font-semibold">الحالة</TableHead>
                                    <TableHead className="text-center font-semibold">الإجراءات</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredProperties.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Building2 className="h-10 w-10 text-muted-foreground/50" />
                                                <p className="text-muted-foreground">لا توجد عقارات</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredProperties.map((property: Property, index: number) => (
                                        <TableRow
                                            key={property._id}
                                            className="animate-slide-up transition-colors hover:bg-table-hover"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                                                        {property.images.length > 0 ? (
                                                            <img
                                                                src={property.images[0].path}
                                                                alt={property.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <ImageIcon className="h-5 w-5 text-muted-foreground" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-foreground line-clamp-1">
                                                            {property.title}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            {property.bedrooms && (
                                                                <span className="flex items-center gap-1">
                                                                    <Bed className="h-3 w-3" />
                                                                    {property.bedrooms}
                                                                </span>
                                                            )}
                                                            {property.bathrooms && (
                                                                <span className="flex items-center gap-1">
                                                                    <Bath className="h-3 w-3" />
                                                                    {property.bathrooms}
                                                                </span>
                                                            )}
                                                            <span className="flex items-center gap-1">
                                                                <Eye className="h-3 w-3" />
                                                                {/* {property.views || 0} */}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1 text-muted-foreground">
                                                    <MapPin className="h-4 w-4 shrink-0" />
                                                    <span className="line-clamp-1">
                                                        {property.location.city}، {property.location.governorate}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant="outline">
                                                    {propertyTypeLabels[property.type]}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge >
                                                    {purposeLabels[property.purpose]}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center font-semibold text-primary">
                                                {formatPrice(property.price, property.purpose)}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-1 text-muted-foreground">
                                                    <Maximize className="h-4 w-4" />
                                                    <span>{property.area} م²</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge >
                                                    {statusLabels[property.status]}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center justify-center gap-2">
                                                    <Dialog>
                                                        <DialogTrigger>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() => setSelectedProperty(property)}
                                                                className="gap-1 transition-all hover:scale-105"
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-right">
                                                                    تفاصيل العقار
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            {selectedProperty && (
                                                                <div className="space-y-4">
                                                                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                                                                        {selectedProperty.images.length > 0 ? (
                                                                            <img
                                                                                src={selectedProperty.images[0].path}
                                                                                alt={selectedProperty.title}
                                                                                className="h-full w-full object-cover rounded-lg"
                                                                            />
                                                                        ) : (
                                                                            <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                                                        )}
                                                                    </div>
                                                                    <div>
                                                                        <h3 className="text-xl font-bold">{selectedProperty.title}</h3>
                                                                        <p className="text-muted-foreground mt-1">
                                                                            {selectedProperty.description}
                                                                        </p>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">السعر</p>
                                                                            <p className="font-bold text-primary text-lg">
                                                                                {formatPrice(selectedProperty.price, selectedProperty.purpose)}
                                                                            </p>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">المساحة</p>
                                                                            <p className="font-semibold">{selectedProperty.area} م²</p>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">النوع</p>
                                                                            <Badge variant="outline">
                                                                                {propertyTypeLabels[selectedProperty.type]}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">الحالة</p>
                                                                            <Badge >
                                                                                {statusLabels[selectedProperty.status]}
                                                                            </Badge>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">الموقع</p>
                                                                            <p className="flex items-center gap-1">
                                                                                <MapPin className="h-4 w-4" />
                                                                                {selectedProperty.location.city}، {selectedProperty.location.governorate}
                                                                            </p>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">طريقة الدفع</p>
                                                                            <p>{paymentLabels[selectedProperty.paymentMethod || "cash"]}</p>
                                                                        </div>
                                                                        {selectedProperty.bedrooms && (
                                                                            <div className="space-y-2">
                                                                                <p className="text-sm text-muted-foreground">غرف النوم</p>
                                                                                <p className="flex items-center gap-1">
                                                                                    <Bed className="h-4 w-4" />
                                                                                    {selectedProperty.bedrooms}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        {selectedProperty.bathrooms && (
                                                                            <div className="space-y-2">
                                                                                <p className="text-sm text-muted-foreground">الحمامات</p>
                                                                                <p className="flex items-center gap-1">
                                                                                    <Bath className="h-4 w-4" />
                                                                                    {selectedProperty.bathrooms}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">نوع المُعلن</p>
                                                                            <p>{advertiserLabels[selectedProperty.advertiserType || "owner"]}</p>
                                                                        </div>
                                                                        <div className="space-y-2">
                                                                            <p className="text-sm text-muted-foreground">المشاهدات</p>
                                                                            <p className="flex items-center gap-1">
                                                                                <Eye className="h-4 w-4" />
                                                                                {/* {selectedProperty.views || 0} */}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleEdit(property)}
                                                        className="gap-1 transition-all hover:scale-105 hover:bg-primary hover:text-primary-foreground"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>

                                                    {/* Delete Button */}

                                                    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                                                        <DialogTrigger>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                className="gap-1 transition-all hover:scale-105"
                                                            >
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader className="text-right">
                                                                <DialogTitle className="text-right">هل تريد حذف  العقار ؟</DialogTitle>

                                                            </DialogHeader>
                                                            <div className="grid gap-4">
                                                                هيتم حذف العقار {property.title}
                                                            </div>
                                                            <DialogFooter>
                                                                <DialogClose>
                                                                    <Button variant="outline">الغاء</Button>
                                                                </DialogClose>
                                                                <Button
                                                                    onClick={() => handleDelete(property._id)}
                                                                    variant={"destructive"} type="submit" disabled={isPending}>{isPending ?? <Loader2 className='size-5 animate-spin transition-all' />} حذف العقار</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between border-t border-border/50 px-6 py-4">
                        <p className="text-sm text-muted-foreground">
                            عرض {filteredProperties.length} من {properties.length} عقار
                        </p>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={Number(page) <= 1}
                                onClick={() => router.push(`?page=${Number(page) - 1}`)}
                                className="gap-1"
                            >
                                <ChevronRight className="h-4 w-4" />
                                السابق
                            </Button>

                            <div className="flex items-center gap-1">
                                <span className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                                    {page}
                                </span>
                            </div>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={data.metadata.totalPages <= Number(page)}
                                onClick={() => router.push(`?page=${Number(page) + 1}`)}
                                className="gap-1"
                            >
                                التالي
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default AdminPropertiesTable