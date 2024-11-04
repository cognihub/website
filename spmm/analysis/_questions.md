# Questions

## Should we fetch data from a route handler or directly in the server component ? 

If you need to fetch data in a client component, you can call a [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) from the client. Route Handlers execute on the server and return the data to the client. This is useful when you don't want to expose sensitive information to the client, such as API tokens.

See the [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) documentation for examples.

> **Server Components and Route Handlers**
> 
> Since Server Components render on the server, you don't need to call a Route Handler from a Server Component to fetch data. Instead, you can fetch the data directly inside the Server Component.


## Τα server actions καλούνται από client ή από server components? (ή και από τα δύο) 

Server Actions are **asynchronous functions** that are executed on the server. They can be used in Server and Client Components to handle form submissions and data mutations in Next.js applications.


## About data fetching caching in our application

### How we can leverage NextJS cache  for data fetching

Since we are using Firebase's API for data fetching, we can't use NexjtJS's `fetch` function. 
Based on their [documentation](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#fetching-data-on-the-server-with-third-party-libraries) we can proceed with [Route Segment Config](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config) and React's
[cache](https://react.dev/reference/react/cache) function.

For e.g.

```ts
import { cache } from 'react'
 
export const getItem = cache(async (id: string) => {
  const item = await db.item.findUnique({ id })
  return item
})
```

Although the `getItem` function is called twice, only one query will be made to the database.

```jsx
import { getItem } from '@/utils/get-item'
 
export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Layout({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```

```jsx
import { getItem } from '@/utils/get-item'
 
export const revalidate = 3600 // revalidate the data at most every hour
 
export default async function Page({
  params: { id },
}: {
  params: { id: string }
}) {
  const item = await getItem(id)
  // ...
}
```

- The React `cache` function is used to [memoize](https://nextjs.org/docs/app/building-your-application/caching#request-memoization) data requests.
- The `revalidate` option is set to `3600` in the Layout and Page segments, meaning the data will be cached and revalidated at most every hour.

NextJS has other forms of caching that we will not delve into, since they are typically applied automatically without user intervention. 

### How we can leverage Firebase cache for data fetching

Firebase Hosting uses a powerful global CDN to make your site as fast as possible.

Any requested **_static content_ is automatically cached on the CDN**. If you redeploy your site's content, Firebase Hosting automatically clears all your cached content across the CDN until the next request.

The browser and the CDN cache your content based on:

- The hostname
- The path
- The query string
- The content of the request headers specified in the [`Vary` header](https://firebase.google.com/docs/hosting/manage-cache#vary_headers)


## On static site generation

Since we don't use NextJS `fetch` function, we can't have access on-demand revalidaiton (at least with native NextJS reasons). For SSG there's an option with using `getStaticParams` to generate static paths at build time, but not sure if it's worth having to rebuild the whole website for 1 event and announcement per month.