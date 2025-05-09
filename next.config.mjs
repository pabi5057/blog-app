/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com"],
    },
    redirects: async () => [
      {
        source: '/',
        destination: '/admin',
        permanent: false,
      },
    ],
  };
  
  export default nextConfig;
  