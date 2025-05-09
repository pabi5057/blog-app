/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com"],
    },
    redirects: async () => [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ],
  };
  
  export default nextConfig;
  