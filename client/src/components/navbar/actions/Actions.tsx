import React, { useState } from 'react';
import './Actions.css';
import Button from "../../button/Button"; // Make sure the path is correct
import PersonIcon from '@mui/icons-material/Person';



// Define a test user data
const TEST_USER = {
    id: "12345",
    username: "testuser",
    email: "testuser@example.com"
};

interface User {
    id: string;
    username: string;
    email: string;
}

export default function Actions() {
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = () => {
        setUser({
            id: "12345",
            username: "testuser",
            email: "testuser@example.com"
        }); // This now matches the User type
        localStorage.setItem('user', JSON.stringify(TEST_USER));
        console.log('Logged in as Test User:', TEST_USER);
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        console.log('Logged out');
    };

    return (
        <div className="actions">
            {!user && <Button label="Log In" onClick={handleLogin} />}
            {user && (
                <div className="profile">
                    <PersonIcon className="hoverable" />
                    <span>{user.username}</span> {/* This is now valid */}

                    <Button label="Log Out" onClick={handleLogout} />
                </div>
            )}
        </div>
    );
}