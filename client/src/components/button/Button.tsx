import React from 'react';
import './Button.css';

interface ButtonProps {
    primary?: boolean;
    label: string;
    className?: string; // Optional className for additional styling
    onClick?: () => void; // Optional onClick event handler
}

export default function Button({ primary, label, className, onClick }: ButtonProps) {
    const buttonClass = primary ? "button primary-button" : "button secondary-button";
    // Ensure the div is clickable and handles the onClick event
    return (
        <div className={`${buttonClass} ${className || ''}`} onClick={onClick}>
            {label}
        </div>
    );
}
