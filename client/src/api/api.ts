import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Adjust if your base URL differs

// Function to fetch all posts
export const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/posts`);
        return response.data.data; // Accessing the 'data' property from the response
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        throw error; // Rethrow to handle it where the function is called
    }
};

// Function to fetch the vote count for a specific post
export const fetchPostVotes = async (postId: string) => {
    try {
        const response = await axios.get(`${API_URL}/post/${postId}/votes`);
        return response.data; // Assuming the backend sends the vote count in a straightforward format
    } catch (error) {
        console.error(`Failed to fetch votes for post ${postId}:`, error);
        throw error; // Rethrow to handle it where the function is called
    }
};

