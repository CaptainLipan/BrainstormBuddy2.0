import React, { useState } from 'react';
import './Landing.css';
import Navbar from "../../components/navbar/Navbar";
import Filter from "../../components/mainbar/filter/Filter";
import Posts from "../../components/mainbar/posts/Posts";
import CreatePostButton from "../../components/mainbar/createPostButton/CreatePostButton";
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('newReleases');  // Default filter

    const handleCreatePost = () => {
        navigate('/create-post');
    };

    const handleFilterChange = (selectedFilter: string) => {
        setFilter(selectedFilter);  // Update the filter state when changed
    };

    return (
        <div className="landing-page">
            <Navbar />
            <CreatePostButton onClick={handleCreatePost} />
            <Filter onFilterChange={handleFilterChange} />
            <Posts currentFilter={filter} />
        </div>
    );
}
