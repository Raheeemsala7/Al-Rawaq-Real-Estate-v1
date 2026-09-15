import { Card, CardContent } from "@/shared/components/ui/card";
import { TrendingUp, LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: number | string | undefined;
    icon: LucideIcon;
    trend?: "up" | "down";
    trendValue?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, trendValue }: StatCardProps) => (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold">
                        {typeof value === "number" ? value.toLocaleString("ar-EG") : value}
                    </p>
                    {trend && trendValue && (
                        <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                            <TrendingUp className={`h-4 w-4 ${trend === "down" ? "rotate-180" : ""}`} />
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                {/* Icon container with brand accent tone */}
                <div className="p-4 rounded-2xl bg-[#A89989]/15 text-[#7D6D5E] dark:bg-[#A89989]/20 dark:text-[#C4AFA0]">
                    <Icon className="h-8 w-8" />
                </div>
            </div>
        </CardContent>
    </Card>
);