// src/models/comment/CommentModel.ts
export interface CreateCommentInput {
    text: string;
    postId: string;
    userId: string;
}

export interface CommentData {
    _id: string;
    text: string;
    postId: string;
    userId: string;
    createdAt: string;  // Assuming the date comes in as a string to convert later
    _creator: {
        username: string;
    };
}