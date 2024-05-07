import axios from 'axios';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interface for data needed to create a post
interface CreatePostInput {
    title: string;
    text: string;
    link?: string;
    userId: string;  // User ID should be supplied from the client
}

// Interface for the structure of a post as returned from the backend
interface PostData {
    _id: string;
    title: string;
    text: string;
    link?: string;
    userId: string;
    _creator: {
        username: string;
    };
    createdAt: string;
    updatedAt?: string;
}

// Interface for the voting functionality
interface VotePayload {
    postId: string;
    userId: string;
}

interface VoteResponse {
    success: boolean;
    netVotes?: number;
    message?: string;
}

// Function to fetch all posts
export const fetchPosts = async (): Promise<PostData[]> => {
    const response = await api.get<{ data: PostData[] }>('/posts');
    return response.data.data;
};

// Function to create a new post
export const createPost = async (postData: CreatePostInput): Promise<PostData> => {
    try {
        const response = await api.post<{ data: PostData }>('/post', postData);
        return response.data.data;
    } catch (error) {
        console.error("Failed to create a post:", error);
        throw error;
    }
};

// Function to fetch the vote count for a specific post
export const fetchPostVotes = async (postId: string): Promise<number> => {
    try {
        const response = await api.get<VoteResponse>(`/post/${postId}/votes`);
        if (response.data.success) {
            return response.data.netVotes!;
        } else {
            throw new Error('API response was not successful: ' + response.data.message);
        }
    } catch (error) {
        console.error(`Failed to fetch votes for post ${postId}:`, error);
        throw error;
    }
};

// Function to fetch the number of comments for a specific post
export const fetchCommentsCount = async (postId: string): Promise<number> => {
    try {
        const response = await api.get<{ success: boolean; count: number }>(`/post/${postId}/comments/count`);
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

// Function to upvote a post
export const upvotePost = async (payload: VotePayload): Promise<VoteResponse> => {
    try {
        const response = await api.post<VoteResponse>('/post/upvote', payload);
        return response.data;
    } catch (error) {
        console.error("Failed to upvote post:", error);
        throw error;
    }
};

// Function to downvote a post
export const downvotePost = async (payload: VotePayload): Promise<VoteResponse> => {
    try {
        const response = await api.post<VoteResponse>('/post/downvote', payload);
        return response.data;
    } catch (error) {
        console.error("Failed to downvote post:", error);
        throw error;
    }
};

// Function to undo a vote on a post
export const undoVotePost = async (payload: VotePayload): Promise<VoteResponse> => {
    try {
        const response = await api.post<VoteResponse>('/post/undovote', payload);
        return response.data;
    } catch (error) {
        console.error("Failed to undo vote:", error);
        throw error;
    }
};
