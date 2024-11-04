# Internationalization

NextJS docs provides the Next way to perform the content negotiation and how to localize dynamic (SSR) and client pages.

## Using [NextIntl](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing)

Keeping that in mind let's proceed to [NextIntl](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing) internationalization library for NextJS.

We will proceed with prefix-based i18n routing, with supported prefixes being:

- `/en/[page]`
- `/el/[page]`

And the app router file structure:

```
├── messages
│   ├── en.json // Translations per lang
│   └── ...
├── next.config.js // Provides request-specific i18n config to Server Components
└── src
    ├── i18n
    │   ├── routing.ts // Intergrates with Next.js' routing
    │   └── request.ts // Provides server components with user locale options
    ├── middleware.ts
    └── app
        └── [locale]
            ├── layout.tsx // Pass config to client components and locale param
            └── page.tsx
```

`next.config.js`

```js
const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
 
module.exports = withNextIntl(nextConfig);
```

`routing.ts`

```js
import {defineRouting} from 'next-intl/routing';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

// Defines routes that will used by middleware to negotiate content
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'de'],
 
  // Used when no locale matches
  defaultLocale: 'en'
});
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation(routing);
```

`middleware.ts`

```js
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en)/:path*']
};
```

`src/i18n/request.ts`

```js
import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});
```

`src/app/[locale]/layout.tsx`

```jsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```


`src/app/[locale]/page.tsx`

```js
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}
```

More about using in server and client components can be found [here](https://next-intl-docs.vercel.app/docs/environments/server-client-components) and more to Next-intl [docs](https://next-intl-docs.vercel.app/docs/getting-started).

## About Static Site Generation

Since APIs like `useTranslations` are used in Server Components, the app will opt in for dynamic rendering. For static rendering use [`generateStaticParams`](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) so that the routes can be rendered at build time.

`app/[locale]/layout.tsx`

```js
import {routing} from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}
```

More can be found [here](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing#static-rendering)

### Case where Middleware is packed with Authorization

More can be found [here](https://next-intl-docs.vercel.app/docs/routing/middleware#example-auth-js)

References

1. [NextJS Content Negotiation](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
2. [Next-Intl](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing)
3. [Nextjs i18n](https://phrase.com/blog/posts/nextjs-i18n/)
4. [Next-Intl example](https://github.com/amannn/next-intl/tree/main/examples/example-app-router)
5. [Lingui Middleware example](https://github.com/lingui/js-lingui/blob/main/examples/nextjs-swc/src/middleware.ts)
