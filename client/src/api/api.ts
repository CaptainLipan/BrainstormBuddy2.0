// src/api/api.ts
import axios from 'axios';
import { PostWithCommentsCount, CreatePostInput } from '../models/post/PostModel';
import { CommentData, CreateCommentInput } from '../models/comment/CommentModel';

const API_URL = 'http://localhost:4000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const toggleVote = async (type: string, id: string, voteType: 'upvote' | 'downvote', userId: string): Promise<any> => {
    return axios.post(`${API_URL}/vote/toggle/${type}/${id}/${voteType}`, { userId });
};

// Function to fetch all posts
export const fetchPosts = async (): Promise<PostWithCommentsCount[]> => {
    const response = await api.get<{ data: PostWithCommentsCount[] }>('/posts');
    return response.data.data;
};

// Function to fetch a post by ID
export const fetchPostById = async (postId: string): Promise<PostWithCommentsCount> => {
    const response = await api.get<{ data: PostWithCommentsCount }>(`/post/${postId}`);
    return response.data.data;
};

// Function to create a new post
export const createPost = async (postData: CreatePostInput): Promise<PostWithCommentsCount> => {
    const response = await api.post<{ data: PostWithCommentsCount }>('/post', postData);
    return response.data.data;
};

// Function to get comments for a post
export const getCommentsForPost = async (postId: string): Promise<CommentData[]> => {
    const response = await api.get<{ comments: CommentData[] }>(`${API_URL}/post/${postId}/comments`);
    return response.data.comments;
};

// Function to post a comment
export const postComment = async (commentData: CreateCommentInput): Promise<CommentData> => {
    try {
        const response = await api.post<{ data: CommentData }>(`${API_URL}/comment`, commentData);
        return response.data.data;
    } catch (error) {
        throw error;
    }
};

// Function to fetch the vote count for a specific post
export const fetchPostVotes = async (postId: string): Promise<number> => {
    const response = await api.get<{ success: boolean; netVotes: number }>(`/post/${postId}/votes`);
    if (response.data.success) {
        return response.data.netVotes;
    } else {
        throw new Error('API response was not successful');
    }
};

// Function to fetch the number of comments for a specific post
export const fetchCommentsCount = async (postId: string): Promise<number> => {
    const response = await api.get<{ success: boolean; count: number }>(`/post/${postId}/comments/count`);
    if (response.data.success) {
        return response.data.count;
    } else {
        throw new Error('API response was not successful');
    }
};

// Voting functions
interface VotePayload {
    postId: string;
    userId: string;
}

interface VoteResponse {
    success: boolean;
    netVotes?: number;
    message?: string;
}

export const upvotePost = async (payload: VotePayload): Promise<VoteResponse> => {
    const response = await api.post<VoteResponse>('/post/upvote', payload);
    return response.data;
};

export const downvotePost = async (payload: VotePayload): Promise<VoteResponse> => {
    const response = await api.post<VoteResponse>('/post/downvote', payload);
    return response.data;
};

export const undoVotePost = async (payload: VotePayload): Promise<VoteResponse> => {
    const response = await api.post<VoteResponse>('/post/undovote', payload);
    return response.data;
};
