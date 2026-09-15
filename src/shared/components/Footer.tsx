import { Link } from "@/i18n/navigation";
import { ArrowUp } from "lucide-react";
import { getTranslations } from "next-intl/server";

const Footer = async () => {
    // Translation
    const t = await getTranslations("footer");

    // Variables
    const services = t.raw("services") as string[];
    const links = t.raw("links") as string[];
    const contacts = t.raw("contacts") as string[];

    return (
        <footer className="border-t border-border bg-muted/20 py-12">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Services */}
                    <div>
                        <h6 className="mb-4 font-semibold text-muted-foreground">
                            {t("servicesTitle")}
                        </h6>

                        <ul className="space-y-3 font-medium text-foreground">
                            {services.map((service) => (
                                <li key={service}>
                                    <Link
                                        href="#"
                                        className="transition-colors duration-200 hover:text-[#817263]"
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h6 className="mb-4 font-semibold text-muted-foreground">
                            {t("linksTitle")}
                        </h6>

                        <ul className="space-y-3 font-medium text-foreground">
                            {links.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="transition-colors duration-200 hover:text-[#817263]"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h6 className="mb-4 font-semibold text-muted-foreground">
                            {t("contactTitle")}
                        </h6>

                        <div className="space-y-3 font-medium text-foreground">
                            {contacts.map((contact) => (
                                <p key={contact}>{contact}</p>
                            ))}
                        </div>
                    </div>

                    {/* Back To Top — anchor for progressive enhancement, works without JS */}
                    <div className="flex items-start justify-end">
                        <a
                            href="#"
                            aria-label={t("backToTop")}
                            className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-all duration-300 hover:bg-muted hover:scale-110 hover:shadow-md active:scale-95"
                        >
                            <ArrowUp />
                        </a>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between border-t border-border pt-8 md:flex-row-reverse">
                    <div className="order-1 flex gap-4">
                        {/* Social Media icons — placeholder for future implementation */}
                    </div>

                    <p className="order-2 mt-4 text-sm font-medium text-muted-foreground md:mt-0">
                        {t("copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;