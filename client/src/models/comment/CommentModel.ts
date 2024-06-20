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
    createdAt: string;
    _creator: {
        username: string;
    };
    upvotes: number;
    downvotes: number;
    upvoted: boolean;
    downvoted: boolean;
}
