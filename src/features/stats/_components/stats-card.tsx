import { Card, CardContent } from "@/shared/components/ui/card";
import { TrendingUp } from "lucide-react";

export const StatCard = ({ title, value, icon: Icon, trend, trendValue }: any) => (
    <Card className="hover:shadow-card transition-shadow duration-300">
        <CardContent className="p-6">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{title}</p>
                    <p className="text-3xl font-bold">{typeof value === "number" ? value.toLocaleString("ar-EG") : value}</p>
                    {trend && trendValue && (
                        <div className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-success" : "text-destructive"}`}>
                            <TrendingUp className={`h-4 w-4 ${trend === "down" ? "rotate-180" : ""}`} />
                            <span>{trendValue}</span>
                        </div>
                    )}
                </div>
                <div className="p-4 rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-8 w-8" />
                </div>
            </div>
        </CardContent>
    </Card>
);