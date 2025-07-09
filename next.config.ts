import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true,
    },
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'swbxrvsh7sbt6vxx.public.blob.vercel-storage.com',
                port: '',
            }
        ]
    },

};

export default nextConfig;
