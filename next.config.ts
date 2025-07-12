import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true,
        nodeMiddleware: true
    },
    output: "standalone",
    transpilePackages: ['next-mdx-remote'],
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
