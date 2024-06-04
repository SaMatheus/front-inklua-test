import withBundleAnalyzer from "@next/bundle-analyzer";
import withPlugins from "next-compose-plugins";
import { env } from "./env.mjs";

/**
 * @type {import('next').NextConfig}
 */
const config = withPlugins([[withBundleAnalyzer({ enabled: env.ANALYZE })]], {
  reactStrictMode: true,
  experimental: {
    instrumentationHook: true,
    serverActions: true,
  },
  // rewrites() {
  //   return [
  //     { source: "/", destination: "/pagina-inicial" }
  //   ]
  // },
  images: {
    remotePatterns: [
      {
        hostname: 's3.sa-east-1.amazonaws.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // This will skip TypeScript errors
  },
})

export default config

