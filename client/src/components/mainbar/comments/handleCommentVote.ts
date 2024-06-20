// src/components/mainbar/comments/handleCommentVote.ts
import { toggleVote } from '../../../api/api';
import { CommentData } from '../../../models/comment/CommentModel';

export const handleCommentVote = async (
    comment: CommentData,
    setComment: React.Dispatch<React.SetStateAction<CommentData>>,
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
        const response = await toggleVote('comment', comment._id, type, userId);

        if (response.data.success) {
            const updatedComment = {
                ...comment,
                upvotes: response.data.netVotes ?? comment.upvotes,
                upvoted: response.data.upvoted ?? false,
                downvoted: response.data.downvoted ?? false
            };
            setComment(updatedComment);
        } else {
            alert(response.data.message);
        }
    } catch (error: any) {
        alert("Failed to execute vote operation: " + error.message);
    }
};
