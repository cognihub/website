const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
            port: "",
            pathname: "/**",
         },
      ],
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   async headers() {
      return [
         {
            source: "/:path*",
            headers: [
               {
                  key: "Access-Control-Allow-Origin",
                  value: "cognihub.gr",
               },
               {
                  key: "Access-Control-Allow-Methods",
                  value: "GET, POST, PUT, DELETE, OPTIONS",
               },
               {
                  key: "Access-Control-Allow-Headers",
                  value: "Content-Type, Authorization",
               },
            ],
         },
      ];
   },
};

module.exports = withNextIntl(nextConfig);
