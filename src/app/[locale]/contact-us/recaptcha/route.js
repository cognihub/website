import config from "@/lib/config"

const GOOGLE_RECAPTCHA_VERIFICATION_LINK = `https://www.google.com/recaptcha/api/siteverify`

export async function POST(req) {
   const data = await req.json()
   const { token } = data

   if (!token) {
      return new Response(JSON.stringify({ message: "Token not found" }), {
         status: 400,
         headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
         },
      })
   }

   try {
      const verifyResponse = await fetch(GOOGLE_RECAPTCHA_VERIFICATION_LINK, {
         method: "POST",
         headers: {
            "Content-Type": "application/x-www-form-urlencoded",
         },
         body: new URLSearchParams({
            secret: config.recaptcha.secretKey,
            response: token,
         }).toString(),
      })

      const responseData = await verifyResponse.json()

      if (responseData.success) {
         return new Response(JSON.stringify({ message: "Success" }), {
            status: 200,
            headers: {
               "Access-Control-Allow-Origin": "*", // Adjust as needed for security
            },
         })
      } else {
         return new Response(JSON.stringify({ message: "Failed to verify" }), {
            status: 400,
            headers: {
               "Access-Control-Allow-Origin": "*",
            },
         })
      }
   } catch (error) {
      return new Response(
         JSON.stringify({ message: "Internal Server Error" }),
         {
            status: 500,
            headers: {
               "Access-Control-Allow-Origin": "*",
            },
         }
      )
   }
}

export async function OPTIONS() {
   return new Response(null, {
      headers: {
         "Access-Control-Allow-Origin": "*",
         "Access-Control-Allow-Methods": "POST, OPTIONS",
         "Access-Control-Allow-Headers": "Content-Type",
      },
   })
}
