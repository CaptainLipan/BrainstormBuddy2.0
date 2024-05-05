import React from 'react';
import './Button.css';

interface ButtonProps {
    primary?: boolean;
    label: string;
    className?: string;  // Optional className for additional styling
}

export default function Button({ primary, label, className }: ButtonProps) {
    const buttonClass = primary ? "button primary-button" : "button secondary-button";
    return (
        <div className={`${buttonClass} ${className || ''}`}>{label}</div>
    );
}
