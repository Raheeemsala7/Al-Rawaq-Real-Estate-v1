import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "example.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            }
        ]
    },
}
export default withNextIntl(nextConfig)