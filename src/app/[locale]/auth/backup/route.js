import { NextResponse } from 'next/server'
import { isUserLoggedIn } from '@/lib/auth'
import { backupCognihubAndReturnZipAsBlob } from '@/lib/cognihub-facade'

export async function GET() {
    if (!isUserLoggedIn()) {
        printUserNotLoggedInErrorMessage()
        return 'Ο χρήστης δεν έχει συνδεθεί'
    }

    const blob = await backupCognihubAndReturnZipAsBlob()

    const headers = new Headers()
    headers.set('Content-Type', 'application/zip')
    headers.set('Content-Disposition', 'attachment; filename=documents.zip')

    return new NextResponse(blob, { status: 200, statusText: 'OK', headers })
}
