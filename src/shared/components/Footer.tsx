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
        <footer className="py-12">
            <div className="mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Services */}
                    <div>
                        <h6 className="mb-4 font-semibold text-[#8B8D98]">
                            {t("servicesTitle")}
                        </h6>

                        <ul className="space-y-3 font-medium text-[#302D2B]">
                            {services.map((service) => (
                                <li key={service}>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-gray-900"
                                    >
                                        {service}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Important Links */}
                    <div>
                        <h6 className="mb-4 font-semibold text-[#8B8D98]">
                            {t("linksTitle")}
                        </h6>

                        <ul className="space-y-3 font-medium text-[#302D2B]">
                            {links.map((link) => (
                                <li key={link}>
                                    <Link
                                        href="#"
                                        className="transition-colors hover:text-gray-900"
                                    >
                                        {link}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h6 className="mb-4 font-semibold text-[#8B8D98]">
                            {t("contactTitle")}
                        </h6>

                        <div className="space-y-3 font-medium text-[#302D2B]">
                            {contacts.map((contact) => (
                                <p key={contact}>{contact}</p>
                            ))}
                        </div>
                    </div>

                    {/* Back To Top */}
                    <div className="flex items-start justify-end">
                        <button
                            aria-label={t("backToTop")}
                            className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors duration-300 hover:bg-gray-200"
                        >
                            <ArrowUp />
                        </button>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between border-t border-gray-200 pt-8 md:flex-row-reverse">
                    <div className="order-1 flex space-x-4">
                        {/* Social Media */}
                        {/* 
            <Link href="#">
              <Facebook />
            </Link>

            <Link href="#">
              <Instagram />
            </Link>

            <Link href="#">
              <Linkedin />
            </Link>
            */}
                    </div>

                    <p className="order-2 mt-4 text-sm font-medium text-gray-500 md:mt-0">
                        {t("copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;