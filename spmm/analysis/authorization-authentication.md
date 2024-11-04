# Authorization & Authentication

The authorization & authentication parts of Cognihub's website will be implemented atop [Firebase's password-based accounts](https://firebase.google.com/docs/auth/web/password-auth)
by implementing Session Based Authentication (Cookie) using NextJS, in the following base structure:

```js
import { cookies } from 'next/headers'
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export async function login(formData: FormData) {
  // Verify credentials && get the user
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    // Create the session
    const expires = new Date(Date.now() + 10 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // Handle error ...
  });
}

export async function logout() {
  // Sign out of firebase
  signOut(auth).then(() => {
    // Manage firebase sign out
  }).catch((error) => {
    // An error happened.
  }).finally(() => {
    cookies().set("session", "", { expires: new Date(0) });
  });
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
```

With NextJS we will guard the following website aspects.

## Protect admin routes

The protected routes under `/auth/*` will be protected using [NextJs middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)
and matcher option.

```js
export function middleware(request) {
  const session = await getSession()
  const user = session?.user

  if (!user && request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
```

## Protect server actions

The server actions of `createEvent`, `editEvent`, `createAnnouncement`, `editAnnouncement` will be protected.

```js
"use server";

// ...

export async function serverAction() {
  const session = await getSession();
  const user = session?.user;

  // Check if user is authorized to perform the action
  if (!user) {
    throw new Error(
      "Unauthorized access: User does not have admin privileges."
    );
  }

  // Proceed with the action for authorized users
  // ... implementation of the action
}
```

## Protect route handlers

The admin route handler and `backupFirebase` api, will be protected.

```jsx
export async function GET() {
  // User authentication and role verification
  const session = await getSession();

  // Check if the user is authenticated
  if (!session) {
    return new Response(null, { status: 401 }); // User is not authenticated
  }

  // The back up functionality
}
```

## Protect server components / pages

```jsx
import { redirect } from "next/navigation";
import { getSession, login, logout } from "@/lib";

export default async function Page() {
  const session = await getSession();

  if(session.user) redirect("/auth/admin)

  return (
    <section>
      <form
        action={async (formData) => {
          "use server";
          await login(formData);
          redirect("/");
        }}
      >
        <input type="email" placeholder="Email" />
        <br />
        <button type="submit">Login</button>
      </form>
      <form
        action={async () => {
          "use server";
          await logout();
          redirect("/");
        }}
      >
        <button type="submit">Logout</button>
      </form>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
```

References

1. [Firebase Password Based Authentication](https://firebase.google.com/docs/auth/web/password-auth)
2. [NextJS Authentication](https://nextjs.org/docs/app/building-your-application/authentication)
3. [NextJS Authentication example repo](https://github.com/balazsorban44/auth-poc-next)
