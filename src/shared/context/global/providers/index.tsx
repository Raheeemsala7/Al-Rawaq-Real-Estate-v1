import { Toaster } from "sonner"
import ReactQueryProvider from "./components/react-query-provider"
import NextAuthProvider from "./components/next-auth-provider"
import { NextIntlClientProvider } from "next-intl"


export const Providers = ({
    children,
    locale,
    messages
}: {
    children: React.ReactNode
    locale: string
    messages: any
}) => {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ReactQueryProvider>
                <NextAuthProvider >
                    <Toaster richColors position="top-right" />
                    {children}
                </NextAuthProvider>
            </ReactQueryProvider>
        </NextIntlClientProvider>
    )
}