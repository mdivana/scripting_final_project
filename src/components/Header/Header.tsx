import React from 'react'
import logoUrl from '../../assets/images/my-auto-logo.png'

export default function Header() {
    const handleRefresh = () => {
        window.location.reload();
        console.log('click')
    };
    
    return (
        <header>
            <div className="container">
                <div className="header">
                    <img
                        src={logoUrl}
                        alt=""
                        onClick={handleRefresh}
                    />
                </div>
            </div>
        </header>
    )
}