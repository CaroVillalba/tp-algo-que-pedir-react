import React from 'react'
import { Toolbar } from 'primereact/toolbar'
import { Button } from 'primereact/button'
import { useNavigate } from 'react-router-dom'
import './Header.css'

interface HeaderProps {
    title: string
    showBackButton?: boolean
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
    const navigate = useNavigate()

    const startContent = showBackButton ? (
        <Button
            icon="pi pi-arrow-left"
            className="p-button-text"
            onClick={() => navigate(-1)}
        />
    ) : null

    return (
        <Toolbar className='header'
            start={startContent}
            center={<span className="font-semibold text-lg">{title}</span>}
        />
    )
}
