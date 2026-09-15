import { Toaster } from "sonner"
import ReactQueryProvider from "./components/react-query-provider"
import NextAuthProvider from "./components/next-auth-provider"
import { NextIntlClientProvider } from "next-intl"
import { ThemeProvider } from "next-themes"

export const Providers = ({
    children,
    locale,
    messages,
}: {
    children: React.ReactNode
    locale: string
    messages: Record<string, unknown>
}) => {
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange={false}
            >
                <ReactQueryProvider>
                    <NextAuthProvider>
                        <Toaster richColors position="top-right" />
                        {children}
                    </NextAuthProvider>
                </ReactQueryProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    )
}