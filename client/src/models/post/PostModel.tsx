// src/models/post/PostModel.ts
export interface Post {
    _id: string;
    title: string;
    text: string;
    link?: string;
    userId: string;
    _comments: Comment[];
    upvotes: number;
    upvoted?: boolean;
    downvoted?: boolean;
    _creator: { username: string };
    createdAt: string;
    updatedAt?: string;
}

// Optionally, if you have a Comment model
export interface Comment {
    _id: string;
    text: string;
    _creator: {
        username: string;
    };
    createdAt: Date;
}
