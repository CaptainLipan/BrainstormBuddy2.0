import React from 'react';
import './CreatePostButton.css'; // Make sure the CSS path is correct
import { useNavigate } from 'react-router-dom';

// Define the type for the props expected by CreatePostButton
type CreatePostButtonProps = {
    onClick: () => void; // Function type for click event
};

// Define the component using these props
const CreatePostButton: React.FC<CreatePostButtonProps> = ({ onClick }) => {
    return (
        <button className="create-post-button" onClick={onClick}>
            Create Post
        </button>
    );
};

export default CreatePostButton;
