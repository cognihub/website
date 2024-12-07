import parse from 'html-react-parser'
import DOMPurify from 'isomorphic-dompurify'
import { Timestamp } from 'firebase/firestore'

export function timestampDateToString(timestampDate) {
    const date = new Date(timestampDate.seconds * 1000)
    return (
        `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
    )
}

export function timestampDateToDateInput(timestampDate) {
    const date = new Date(timestampDate.seconds * 1000)

    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${year}-${month}-${day}`
}

export function formDateToFirebaseDate(formDate) {
    return Timestamp.fromMillis(Date.parse(formDate))
}

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object
}

export function castParamToArrayIfNeeded(urlParam) {
    return Array.isArray(urlParam) ? urlParam : urlParam ? [urlParam] : []
}

export async function performPostRequestWithJsonBody(url, body) {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export default function html(htmlContent) {
    return <div className='HtmlContent'>{parse(DOMPurify.sanitize(htmlContent))}</div>
}
