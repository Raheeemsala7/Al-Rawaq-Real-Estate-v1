"use client";

import { useDeferredValue, useEffect, useState } from "react";
import { Button } from "@/shared/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/components/ui/table";

import { ChevronLeft, ChevronRight, Search, Trash2, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Badge } from "@/shared/components/ui/badge";
import { useGetAllUsers } from "@/features/user/hooks/user.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";


export default function AdminUsersPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [searchInput, setSearchInput] = useState("");
    const deferredSearch = useDeferredValue(searchInput);
    const page = searchParams.get("page") || 1
    const t = useTranslations("dashboard.users")

    const { data, isLoading } = useGetAllUsers();

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (deferredSearch) {
            params.set("search", deferredSearch);
        } else {
            params.delete("search");
        }

        params.set("page", "1");
        router.push(`?${params.toString()}`);

    }, [deferredSearch]);



    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-muted-foreground">{t("loading")}</p>
                </div>
            </div>
        );
    }

    if (!data?.success) {
        return <h4>{t("error")}</h4>
    }

    const users = data.data

    const handleDelete = (userId: string) => {
        if (confirm(t("deleteConfirm"))) {
            // deleteMutation.mutate(userId);
        }
    };

    const getRoleBadgeVariant = (role: string): "default" | "secondary" | "destructive" => {
        switch (role) {
            case "admin":   return "destructive";
            case "buyer":   return "secondary";
            default:        return "default";
        }
    };

    const getRoleLabel = (role: string) => {
        return role === "admin" ? t("roles.admin") : t("roles.buyer");
    };

    return (
        <>
            {/* Header */}
            <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <Users className="h-6 w-6" />
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

                {/* Stats */}
                <div className="flex gap-3">
                    <div className="rounded-lg bg-card border border-border px-4 py-2 shadow-sm">
                        <p className="text-xs text-muted-foreground">{t("totalUsers")}</p>
                        <p className="text-xl font-bold text-foreground">{data.metadata.totalUsers}</p>
                    </div>
                    <div className="rounded-lg bg-card border border-border px-4 py-2 shadow-sm">
                        <p className="text-xs text-muted-foreground">{t("admins")}</p>
                        <p className="text-xl font-bold text-primary">
                            {users.filter((u) => u.role === "admin").length}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Card */}
            <Card className="border border-border shadow-sm">
                <CardHeader className="border-b border-border/50 pb-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <CardTitle className="text-lg font-semibold">
                            {t("listTitle")}
                        </CardTitle>

                        {/* Search */}
                        <div className="relative max-w-sm">
                            <Search className="absolute end-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder={t("search")}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
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
                                    <TableHead className="font-semibold">{t("columns.name")}</TableHead>
                                    <TableHead className="font-semibold">{t("columns.email")}</TableHead>
                                    <TableHead className="text-center font-semibold">{t("columns.role")}</TableHead>
                                    <TableHead className="text-center font-semibold">{t("columns.verified")}</TableHead>
                                    <TableHead className="text-center font-semibold">{t("columns.actions")}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <Users className="h-10 w-10 text-muted-foreground/50" />
                                                <p className="text-muted-foreground">{t("empty")}</p>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    users.map((user, index) => (
                                        <TableRow
                                            key={user._id}
                                            className="transition-colors"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {user.email}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={getRoleBadgeVariant(user.role)}>
                                                    {getRoleLabel(user.role)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Badge variant={user.isEmailVerified ? "default" : "secondary"}>
                                                    {user.isEmailVerified ? t("verified") : t("notVerified")}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDelete(user._id)}
                                                    className="gap-2 transition-all hover:scale-105"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="hidden sm:inline">{t("delete")}</span>
                                                </Button>
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
                            {t("showing")} {((Number(page) - 1) * 12) + 1}–{((Number(page) - 1) * 12) + data.data.length} {t("of")} {data.metadata.totalUsers}
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
                                {t("prev")}
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
                                {t("next")}
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}
