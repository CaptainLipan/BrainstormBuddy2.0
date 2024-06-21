import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import { createPost as createPostApi } from "../../api/api";
import './CreatePost.css';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const testUserId = "66380f8f7af302d62f105e55";

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            const userInfo = JSON.parse(loggedUser);
            if (userInfo._id !== testUserId) {
                setError('You are not authorized to post.');
            }
        } else {
            setError('You must be logged in to post.');
        }

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (title || text) {
                e.preventDefault();
                e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [title, text]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
        if (!userInfo || userInfo._id !== testUserId) {
            setError('You are not authorized to post.');
            return;
        }

        if (!title) {
            setError('Title is required');
            return;
        }

        try {
            const postData = { title, text, userId: userInfo._id };
            const response = await createPostApi(postData);
            console.log('Post created:', response);
            navigate('/');
        } catch (err) {
            console.error('Error creating post:', err);
            setError('Failed to create post');
        }
    };

    const handleCancel = () => {
        if (title || text) {
            const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
            if (!confirmLeave) {
                return;
            }
        }
        navigate('/');
    };

    return (
        <div>
            <Navbar />
            <form className="create-post-form" onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </label>
                <label>
                    Text:
                    <textarea value={text} onChange={(e) => setText(e.target.value)} />
                </label>
                {error && <p className="error">{error}</p>}
                <div className="create-post-button-container">
                    <button type="submit" className="create-post-button">Create Post</button>
                    <button type="button" className="create-post-button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreatePost;
