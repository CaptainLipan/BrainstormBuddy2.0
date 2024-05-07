import React, { useState } from 'react';
import './Actions.css';
import Button from "../../button/Button"; // Make sure the path is correct
import PersonIcon from '@mui/icons-material/Person';

// Define a test user data based on your database user structure
const TEST_USER = {
    _id: "66380f8f7af302d62f105e55",
    username: "testUser",
    email: "testuser@example.com",
    __v: 0
};

interface User {
    _id: string;
    username: string;
    email: string;
    __v: number;
}

export default function Actions() {
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = () => {
        // Setting the user based on the test user object
        setUser(TEST_USER);
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
                    <span>{user.username}</span> {/* Display the username */}

                    <Button label="Log Out" onClick={handleLogout} />
                </div>
            )}
        </div>
    );
}
