import { CommentData } from '../comment/CommentModel'; // Adjust the path based on your project structure

export interface Post {
    _id: string;
    title: string;
    text: string;
    link?: string;
    userId: string;
    _creator: { username: string };
    createdAt: string;
    updatedAt?: string;
    upvotes: number;
    upvoted?: boolean;
    downvoted?: boolean;
}

export interface PostWithCommentsCount extends Post {
    commentsCount: number;
    _comments: CommentData[];
    showComments: boolean;
}

export interface CreatePostInput {
    title: string;
    text: string;
    link?: string;
    userId: string;  // User ID should be supplied from the client
}
