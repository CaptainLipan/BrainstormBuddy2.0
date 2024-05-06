import React from 'react';
import './Landing.css';
import Navbar from "../../navbar/Navbar";
import Filter from "../../mainbar/filter/Filter";
import Posts from "../../mainbar/posts/Posts";
import CreatePostButton from "../../mainbar/createPostButton/CreatePostButton";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Landing() {
    const navigate = useNavigate(); // Initialize useNavigate
    const handleCreatePost = () => {
        navigate('/create-post'); // Navigate to the create-post route
    };

    return (
        <div className="landing-page">
            <Navbar />
            <CreatePostButton onClick={handleCreatePost} />
            <Filter />
            <Posts />
        </div>
    );
}
