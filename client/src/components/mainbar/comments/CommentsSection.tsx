// CommentSection.tsx
import React, { useState, useEffect } from 'react';
import { getCommentsForPost, postComment } from '../../../api/api'; // Adjust the path as necessary
import Comment from './Comment'; // Adjust the path as necessary
import { IComment } from '../../../models/comment/CommentModel';
import './Comment.css'
interface CommentsSectionProps {
    postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
    const [comments, setComments] = useState<IComment[]>([]);  // Now TypeScript knows what's in the array
    const [newComment, setNewComment] = useState('');
    const userId = "user-id"; // This should be dynamically set based on logged-in user

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        const fetchedComments = await getCommentsForPost(postId);
        setComments(fetchedComments); // Assuming fetchedComments is already an IComment[]
    };

    const handleCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (newComment.trim()) {
            const comment = await postComment(newComment, postId, userId);
            setComments([...comments, comment]);  // Assuming the response is of type IComment
            setNewComment('');
        }
    };

    return (
        <div className="comments-section">
            <form className="comments-form">
                <textarea placeholder="Add a comment..."></textarea>
                <button type="submit">Post Comment</button>
            </form>
            {/* Iteration over comments, each wrapped in a Comment component */}
            {comments.map(comment => (
                <Comment key={comment._id} comment={comment} />
            ))}
        </div>
    );
};

export default CommentsSection;
