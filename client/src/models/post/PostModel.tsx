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

    showComments?: boolean;  // Flag to toggle comments display

    }


