import { Home, Ruler, User, Building2 } from 'lucide-react'

interface PricePerformanceSectionProps {
    priceDiffPercent?: number
    sizeDiffPercent?: number
    avgPrice?: number
    avgArea?: number
    agentName?: string
    agencyName?: string
    agencyListingsCount?: number
    bedroomsCount?: number
    city?: string
}

const PricePerformanceSection = ({
    priceDiffPercent = 25,
    sizeDiffPercent = 23,
    avgPrice = 60000,
    avgArea = 180,
    agentName = 'Fatma Elnagar',
    agencyName = 'Global Marketing Real Estate',
    agencyListingsCount = 1650,
    bedroomsCount = 3,
    city = 'القاهرة',
}: PricePerformanceSectionProps) => {
    function toArabicNumbers(input: string | number): string {
        return input.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[parseInt(d)])
    }

    return (
        <div dir="rtl" className="py-4">
            {/* Price Performance */}
            <h5 className="text-2xl font-semibold mb-8">مؤشرات أداء الأسعار</h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Price card */}
                <div className="border border-border rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm text-foreground leading-relaxed mb-1">
                                هذا العقار تكلفته{' '}
                                <strong className="font-semibold">{toArabicNumbers(priceDiffPercent)}% المزيد</strong>{' '}
                                من المعدل سعر {toArabicNumbers(bedroomsCount)} غرف نوم في {city}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                متوسط الإيجار هو {toArabicNumbers(avgPrice.toLocaleString())} جنيه
                            </p>
                        </div>
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Home className="w-5 h-5 text-muted-foreground stroke-[1.4px]" />
                        </div>
                    </div>
                </div>

                {/* Size card */}
                <div className="border border-border rounded-xl p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm text-foreground leading-relaxed mb-1">
                                هذا العقار{' '}
                                <strong className="font-semibold">{toArabicNumbers(sizeDiffPercent)}% اكبر</strong>{' '}
                                من المعدل حجم {toArabicNumbers(bedroomsCount)} غرف نوم في {city}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                معدل المساحة {toArabicNumbers(avgArea)} متر مربع
                            </p>
                        </div>
                        <div className="shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                            <Ruler className="w-5 h-5 text-muted-foreground stroke-[1.4px]" />
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-xs text-muted-foreground text-center leading-relaxed mb-10">
                تعتمد البيانات المعروضة على متوسط الأسعار والمساحات لجميع العقارات التي كانت موجودة على بروبرتي فايندر في {city}
            </p>

            {/* Agent section */}
            <h5 className="text-2xl font-semibold mb-6">المقدمة من</h5>

            <div className="border border-border rounded-xl p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Agent info */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                            <User className="w-6 h-6 text-muted-foreground stroke-[1.4px]" />
                        </div>
                        <p className="font-medium text-base">{agentName}</p>
                    </div>

                    {/* Agency info */}
                    <div className="border border-border rounded-lg p-3 flex items-center gap-3">
                        <div>
                            <p className="text-sm font-medium mb-0.5">{agencyName}</p>
                            <p className="text-xs text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                                شاهد عقارات الوكالة ({toArabicNumbers(agencyListingsCount)})
                            </p>
                        </div>
                        <div className="w-9 h-9 rounded-md bg-muted flex items-center justify-center shrink-0">
                            <Building2 className="w-5 h-5 text-muted-foreground stroke-[1.4px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricePerformanceSection
