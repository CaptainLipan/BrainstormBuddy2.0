import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Logo.css';

export default function Logo() {
    const navigate = useNavigate(); // Hook for navigation

    return (
        <div className="logo hoverable" onClick={() => navigate('/')}>
            <img src="/assets/images/Brain_Logo.png" alt="company logo"/>
            <span>BrainstormBuddy</span>
        </div>
    );
}
