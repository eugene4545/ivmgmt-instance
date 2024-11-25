/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "https://s3-inventmanagement.s3.us-east-1.amazonaws.com",
                port: "",
                pathname: "/**"
            }
        ]
    },
};

export default nextConfig;
