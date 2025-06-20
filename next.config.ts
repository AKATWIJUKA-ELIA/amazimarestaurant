import type { NextConfig } from "next";

const nextConfig: NextConfig = {
        images: {
                  remotePatterns: [
                        {
                      protocol: 'https',
                      hostname: 'cheery-cod-687.convex.cloud',
                      pathname: '/**',
                    },
                    {
                        protocol: 'https',
                        hostname: 'fra.cloud.appwrite.io',
                        pathname: '/**',
                      },
                      {
                        protocol: 'https',
                        hostname: 'lh3.googleusercontent.com',
                        pathname: '/**',
                      },
                  ],
                },
  /* config options here */
};

export default nextConfig;
