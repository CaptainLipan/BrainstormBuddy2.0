// api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/api'; // Base URL for API calls

// Axios instance to set up a base configuration
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Define the interface for post data
interface PostData {
    title: string;
    text: string;
    link?: string;
    userId: string;
}

// Function to fetch all posts
export const fetchPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data.data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        throw error;
    }
};

// Function to create a new post
export const createPost = async (postData: PostData) => {
    try {
        const response = await axios.post(`${API_URL}/posts`, postData);
        return response.data;
    } catch (error) {
        console.error("Failed to create a post:", error);
        throw error;
    }
};

// Function to fetch the vote count for a specific post
export const fetchPostVotes = async (postId: string) => {
    try {
        const response = await api.get(`/post/${postId}/votes`);
        if (response.data.success) {
            return response.data.netVotes;
        } else {
            throw new Error('API response was not successful');
        }
    } catch (error) {
        console.error(`Failed to fetch votes for post ${postId}:`, error);
        throw error;
    }
};

// Function to fetch the number of comments for a specific post
export const fetchCommentsCount = async (postId: string) => {
    try {
        const response = await api.get(`/post/${postId}/comments/count`);
        if (response.data.success) {
            return response.data.count;
        } else {
            throw new Error('API response was not successful');
        }
    } catch (error) {
        console.error(`Failed to fetch comments count for post ${postId}:`, error);
        throw error;
    }
};
