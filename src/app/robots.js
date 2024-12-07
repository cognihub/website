export default function robots() {
   const URL = process.env.NEXT_PUBLIC_SITE_URL

   return {
      rules: {
         userAgent: "*",
         allow: "/",
         disallow: "/private/",
      },
      sitemap: `${URL}/sitemap.xml`,
   }
}
