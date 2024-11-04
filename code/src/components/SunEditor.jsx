'use client'

import dynamic from 'next/dynamic'
import {
    align,
    fontColor,
    fontSize,
    formatBlock,
    hiliteColor,
    horizontalRule,
    lineHeight,
    list,
    table,
    textStyle,
    image,
    link,
} from 'suneditor/src/plugins'
import 'suneditor/dist/css/suneditor.min.css'

const SunEditor = dynamic(() => import('suneditor-react'), {
    ssr: false,
})

export default function SunEditorForm({ defaultValue, handleContentChange }) {
    return (
        <SunEditor
            height='100%'
            defaultValue={defaultValue}
            onChange={handleContentChange}
            setOptions={{
                showPathLabel: false,
                minHeight: '72vh',
                placeholder: 'Type events description',
                plugins: [
                    align,
                    fontColor,
                    fontSize,
                    formatBlock,
                    hiliteColor,
                    horizontalRule,
                    lineHeight,
                    list,
                    table,
                    textStyle,
                    image,
                    link,
                ],
                buttonList: [
                    ['fontSize', 'formatBlock'],
                    [
                        'bold',
                        'underline',
                        'italic',
                        'strike',
                        'subscript',
                        'superscript',
                    ],
                    ['fontColor', 'hiliteColor'],
                    ['removeFormat'],
                    ['outdent', 'indent'],
                    ['align', 'horizontalRule'],
                    ['table', 'link', 'image'],
                ],
                formats: [
                    'p',
                    'div',
                    'h1',
                    'h2',
                    'h3',
                    'h4',
                    'h5',
                    'h6',
                ]
            }}
        />
    )
}
