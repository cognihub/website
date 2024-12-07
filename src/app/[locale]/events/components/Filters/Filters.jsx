'use client'

import React, { useCallback } from 'react'
import { MultiSelect } from 'react-multi-select-component'
import { useSearchParams } from 'next/navigation'
import { Link, useRouter } from '@/i18n/routing'

import { EVENT_CATEGORIES } from '@/lib/dictionaries/event-categories'
import { SCIENCE_TAGS } from '@/lib/dictionaries/science-tags'

import styles from './Filters.module.css'

const generateEventsUrlWithFiltersParams = (name, selectedOptions, currentSearchParams) => {
    const updatedUrlSearchParams = new URLSearchParams(currentSearchParams.toString())

    updatedUrlSearchParams.delete(name)

    selectedOptions.forEach((item) => {
        updatedUrlSearchParams.append(name, item.value)
    })

    return '/events?' + updatedUrlSearchParams.toString()
}

function UrlManagedMultiSelect({ name, options, onFormChange }) {
    const router = useRouter()

    const searchParams = useSearchParams()

    const searchParamValue = searchParams.getAll(name)

    const selectedOptions = searchParamValue
        .map((value) => options.find((option) => option.value === value))
        .filter(Boolean)

    const handleChange = useCallback(async (selectedValue) => {
        const updatedSelectedOptions = selectedOptions.includes(selectedValue)
            ? selectedOptions.filter((option) => option !== selectedValue)
            : [...selectedOptions, selectedValue]

        const newUrl = generateEventsUrlWithFiltersParams(name, updatedSelectedOptions, searchParams)

        await onFormChange(newUrl)

        router.push(newUrl)
    })

    const customCheckboxRenderer = (option) => {
        const id = `checkbox-${option.value}`

        return (
            <div className={styles.MultiSelectCheckbox}>
                <input
                    id={id}
                    type='checkbox'
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleChange(option)}
                />
                <label htmlFor={id}>{option.label}</label>
            </div>
        )
    }

    return (
        <MultiSelect
            className={styles.MultiSelect}
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            disableSearch
            hasSelectAll={false}
            shouldToggleOnHover
            overrideStrings={{
                selectSomeItems: 'Διαθέσιμες επιλογές...',
            }}
            ItemRenderer={({ option }) => customCheckboxRenderer(option)}
        />
    )
}

export default function Filters({ onFilterUpdate }) {
    return (
        <form className={styles.FiltersForm}>
            <div>
                <label>Κατηγορία Δράσης <span><Link href='/events-guide'>📃</Link></span></label>
                <UrlManagedMultiSelect options={EVENT_CATEGORIES} name='categories' onFormChange={onFilterUpdate} />
            </div>
            <div>
                <label>Επιστήμες</label>
                <UrlManagedMultiSelect options={SCIENCE_TAGS} name='scienceTags' onFormChange={onFilterUpdate} />
            </div>
        </form>
    )
}
