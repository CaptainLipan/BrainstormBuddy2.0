import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../navbar/Navbar";
import { createPost as createPostApi } from "../../../api/api"  // make sure the path is correct
import './CreatePost.css';

const CreatePost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const testUserId = "66380f8f7af302d62f105e55";

    useEffect(() => {
        const loggedUser = localStorage.getItem('user');
        if (loggedUser) {
            const userInfo = JSON.parse(loggedUser);
            if (userInfo.id !== testUserId) {
                setError('You are not authorized to post.');
            }
        } else {
            setError('You must be logged in to post.');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
        if (!userInfo || userInfo.id !== testUserId) {
            setError('You are not authorized to post.');
            return;
        }

        if (!title || !text || !link) {
            setError('All fields are required');
            return;
        }

        try {
            const postData = { title, text, link, userId: userInfo.id };
            const response = await createPostApi(postData);
            console.log('Post created:', response);
            navigate('/');
        } catch (err) {
            console.error('Error creating post:', err);
            setError('Failed to create post');
        }
    };

    const handleCancel = () => {
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
                <label>
                    Link:
                    <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
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
