// Note that `app/[locale]/[...rest]/page.tsx`
// is necessary for this page to render.

import { notFound } from 'next/navigation'

export default function CatchAllPage() {
    notFound()
}
