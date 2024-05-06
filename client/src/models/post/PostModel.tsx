// src/models/post/PostModel.ts
export interface Post {
    _id: string;
    title: string;
    text: string;
    link?: string;
    _creator: {
        username: string;  // Simplified user reference
    };
    createdAt: Date;
    updatedAt: Date;
    _comments: Comment[];  // Assuming there's a Comment interface defined somewhere
    upvotes: number;  // Assuming you track upvotes count
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
