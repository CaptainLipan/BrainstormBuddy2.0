import React, { useState } from 'react';
import './Actions.css';
import Button from "../../../components/button/Button";
import PersonIcon from '@mui/icons-material/Person';

const TEST_USER = {
    _id: "66380f8f7af302d62f105e55",
    username: "testUser",
    email: "testuser@example.com",
    __v: 0
};

export default function Actions() {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const handleLogin = () => {
        setUser(TEST_USER);
        localStorage.setItem('user', JSON.stringify(TEST_USER));
        console.log('Logged in as:', TEST_USER);
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
                    <PersonIcon />
                    <span>{user.username}</span>
                    <Button label="Log Out" onClick={handleLogout} />
                </div>
            )}
        </div>
    );
}
