"use client";

import { useTranslations } from "next-intl";
import { MessageCircleWarning, Search, Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useState } from "react";

// Mock data for the reports page
const MOCK_REPORTS = [
    {
        id: "REP-1001",
        userName: "أحمد محمد",
        subject: "مشكلة في تسجيل الدخول",
        status: "pending",
        date: "2024-03-15",
    },
    {
        id: "REP-1002",
        userName: "سارة خالد",
        subject: "استفسار عن عقار رقم 45",
        status: "resolved",
        date: "2024-03-14",
    },
    {
        id: "REP-1003",
        userName: "عمر عبد الله",
        subject: "تحديث بيانات الحساب",
        status: "in_progress",
        date: "2024-03-12",
    },
];

export default function ReportsPage() {
    const t = useTranslations("dashboard.reports");
    const [searchQuery, setSearchQuery] = useState("");

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "pending":
                return <Badge variant="destructive">قيد الانتظار</Badge>;
            case "in_progress":
                return <Badge variant="secondary">جاري المعالجة</Badge>;
            case "resolved":
                return <Badge variant="default" className="bg-green-600 hover:bg-green-700">مكتمل</Badge>;
            default:
                return <Badge variant="outline">{status}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                    <MessageCircleWarning className="h-6 w-6" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">
                        {t("title")}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            {/* Main Card */}
            <Card className="border border-border shadow-sm">
                <CardHeader className="border-b border-border/50 pb-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle className="text-lg font-semibold">
                            {t("title")}
                        </CardTitle>

                        {/* Search */}
                        <div className="relative max-w-sm w-full md:w-auto">
                            <Search className="absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="البحث برقم البلاغ أو اسم المستخدم..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pe-10 bg-background"
                            />
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="font-semibold">{t("columns.id")}</TableHead>
                                    <TableHead className="font-semibold">{t("columns.user")}</TableHead>
                                    <TableHead className="font-semibold">{t("columns.subject")}</TableHead>
                                    <TableHead className="font-semibold text-center">{t("columns.status")}</TableHead>
                                    <TableHead className="font-semibold text-center">{t("columns.date")}</TableHead>
                                    <TableHead className="font-semibold text-center">{t("columns.actions")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {MOCK_REPORTS.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <MessageCircleWarning className="h-10 w-10 text-muted-foreground/50" />
                                                <p className="text-muted-foreground">{t("empty")}</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    MOCK_REPORTS.map((report) => (
                                        <TableRow key={report.id} className="transition-colors">
                                            <TableCell className="font-medium">{report.id}</TableCell>
                                            <TableCell>{report.userName}</TableCell>
                                            <TableCell className="text-muted-foreground">{report.subject}</TableCell>
                                            <TableCell className="text-center">
                                                {getStatusBadge(report.status)}
                                            </TableCell>
                                            <TableCell className="text-center text-muted-foreground">
                                                {report.date}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
