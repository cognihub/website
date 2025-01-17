'use client'

import { useState } from 'react'
import { Icon } from '@iconify/react'
import FileSaver from 'file-saver'
import Tooltip from '@/components/Tooltip/Tooltip'
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner'
import { logout } from '@/app/actions'

export default function AdminHeader() {
    const [isLoading, setIsLoading] = useState(false)

    const handleBackupClick = async () => {
        setIsLoading(true)

        const result = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/backup`, {
            method: "GET",
            redirect: "follow"
        })
        
        const blob = await result.blob()
        const filename = 'backup.zip'

        FileSaver.saveAs(blob, filename)

        setIsLoading(false)
    }

    const handleLogoutClick = async () => {
        await logout()
    }

    return (
        <div>
            {isLoading ? (
                <div style={{ marginRight: '25px' }}>
                    <LoadingSpinner />
                </div>
            ) : (
                <Tooltip title='Backup' position='bottom-left'>
                    <Icon
                        icon='material-symbols:download'
                        width='25'
                        onClick={handleBackupClick}
                    />
                </Tooltip>
            )}
            <Tooltip title='Logout' position='bottom-left'>
                <Icon icon='material-symbols:logout' width='25' onClick={handleLogoutClick} />
            </Tooltip>
        </div>
    )
}
