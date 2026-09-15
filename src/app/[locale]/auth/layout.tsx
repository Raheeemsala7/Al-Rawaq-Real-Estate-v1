import React from 'react'
import { getTranslations } from 'next-intl/server'
import { getLocale } from 'next-intl/server'

// Animated SVG geometric background pattern for the brand panel
function GeometricPattern() {
    return (
        <svg
            className="absolute inset-0 h-full w-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                <pattern
                    id="geo-grid"
                    x="0"
                    y="0"
                    width="60"
                    height="60"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 60 0 L 30 30 L 60 60 M 0 0 L 30 30 L 0 60"
                        fill="none"
                        stroke="white"
                        strokeWidth="0.8"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#geo-grid)" />
        </svg>
    )
}

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
    const t = await getTranslations('auth.login')
    const locale = await getLocale()
    const isRTL = locale === 'ar'

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* ── Brand Panel ─────────────────────────────────────────────── */}
            <div
                className={[
                    'relative hidden lg:flex flex-col items-center justify-center px-12 py-16 overflow-hidden',
                    // Brand warm gradient
                    'bg-gradient-to-br from-[#A89989] via-[#7D6D5E] to-[#302D2B]',
                    // RTL: brand panel on the right side
                    isRTL ? 'order-last' : 'order-first',
                ].join(' ')}
            >
                {/* Animated geometric mesh */}
                <GeometricPattern />

                {/* Floating circle accents */}
                <div className="absolute -top-24 -start-24 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute -bottom-24 -end-24 h-80 w-80 rounded-full bg-black/10 blur-3xl" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center gap-10 text-center max-w-sm">
                    {/* Logo */}
                    <div className="flex flex-col items-center gap-2">
                        <span
                            className="text-5xl font-bold text-white"
                            style={{ fontFamily: 'serif' }}
                        >
                            الرِّواقْ
                        </span>
                        <p className="text-sm font-medium text-white/70 tracking-wide">
                            {t('brandTagline')}
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="w-16 border-t border-white/30" />

                    {/* Testimonial Quote */}
                    <blockquote className="space-y-4">
                        {/* Quote mark */}
                        <svg
                            className="mx-auto h-8 w-8 text-white/40"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="text-base text-white/80 leading-relaxed">
                            {t('brandQuote')}
                        </p>
                        <footer className="text-sm text-white/50">
                            — {t('brandQuoteAuthor')}
                        </footer>
                    </blockquote>

                    {/* Stats strip */}
                    <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/20 w-full">
                        {[
                            { value: '500+', label: locale === 'ar' ? 'استشارة' : 'Consultations' },
                            { value: '15+', label: locale === 'ar' ? 'خبير' : 'Experts' },
                            { value: '4.9', label: locale === 'ar' ? 'تقييم' : 'Rating' },
                        ].map((stat) => (
                            <div key={stat.label} className="flex flex-col items-center gap-0.5">
                                <span className="text-xl font-bold text-white">{stat.value}</span>
                                <span className="text-xs text-white/60">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Form Panel ──────────────────────────────────────────────── */}
            <div className={[
                'flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-background',
                isRTL ? 'order-first' : 'order-last',
            ].join(' ')}>
                {/* Mobile-only logo */}
                <div className="mb-8 flex flex-col items-center gap-1 lg:hidden">
                    <span className="text-3xl font-bold" style={{ fontFamily: 'serif' }}>
                        الرِّواقْ
                    </span>
                </div>

                <div className="w-full max-w-sm">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout