"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import SearchBox from "./search/search-box";
import { Button } from "@/shared/components/ui/button";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/shared/components/ui/menubar";

import { ParamsProperties } from "../types/property";

interface PropertyFilterProps {
    filters: ParamsProperties;
}

const propertyTypes = [
    "apartment",
    "villa",
    "house",
    "land",
    "office",
    "store",
] as const;

const PropertyFilter = ({ filters }: PropertyFilterProps) => {
    const t = useTranslations("properties.filters");

    const router = useRouter();
    const searchParams = useSearchParams();

    const purpose = filters.purpose ?? "";
    const type = filters.type ?? "";

    const updateFilter = (
        key: keyof Pick<ParamsProperties, "purpose" | "type">,
        value: string
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.replace(`?${params.toString()}`, {
            scroll: false,
        });
    };

    return (
        <div className="flex items-center max-w-7xl mx-auto gap-4 p-4">
            <div className="flex-1">
                <SearchBox location={filters.location ??""} />
            </div>

            <div className="flex items-center gap-3">
                {/* Purpose */}
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="min-w-24 justify-center">
                            {purpose
                                ? t(`purposeOptions.${purpose}`)
                                : t("purpose")}
                        </MenubarTrigger>

                        <MenubarContent align="center">
                            <MenubarItem
                                onClick={() => updateFilter("purpose", "")}
                            >
                                {t("all")}
                            </MenubarItem>

                            <MenubarItem
                                onClick={() => updateFilter("purpose", "sale")}
                            >
                                {t("purposeOptions.sale")}
                            </MenubarItem>

                            <MenubarItem
                                onClick={() => updateFilter("purpose", "rent")}
                            >
                                {t("purposeOptions.rent")}
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

                {/* Type */}
                <Menubar>
                    <MenubarMenu>
                        <MenubarTrigger className="min-w-24 justify-center">
                            {type
                                ? t(`typeOptions.${type}`)
                                : t("type")}
                        </MenubarTrigger>

                        <MenubarContent align="center">
                            <MenubarItem
                                onClick={() => updateFilter("type", "")}
                            >
                                {t("all")}
                            </MenubarItem>

                            {propertyTypes.map((item) => (
                                <MenubarItem
                                    key={item}
                                    onClick={() => updateFilter("type", item)}
                                >
                                    {t(`typeOptions.${item}`)}
                                </MenubarItem>
                            ))}
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>

                <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl px-8">
                    {t("search")}
                </Button>
            </div>
        </div>
    );
};

export default PropertyFilter;
