// src/components/mainbar/posts/handleVote.ts
import { toggleVote } from '../../../api/api';
import { PostWithCommentsCount } from '../../../models/post/PostModel';

export const handleVote = async (
    post: PostWithCommentsCount,
    setPost: React.Dispatch<React.SetStateAction<PostWithCommentsCount>>,
    type: 'upvote' | 'downvote',
): Promise<void> => {
    const userString = localStorage.getItem('user');
    if (!userString) {
        alert("You need to be logged in to vote.");
        return;
    }
    const user = JSON.parse(userString);

    const userId = user._id;
    try {
        const response = await toggleVote('post', post._id, type, userId);

        if (response.data.success) {
            const updatedPost = {
                ...post,
                upvotes: response.data.netVotes ?? post.upvotes,
                upvoted: response.data.upvoted ?? false,
                downvoted: response.data.downvoted ?? false
            };
            setPost(updatedPost);
        } else {
            alert(response.data.message);
        }
    } catch (error: any) {
        alert("Failed to execute vote operation: " + error.message);
    }
};
