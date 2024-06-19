import React, { useState, useEffect } from 'react';
import { getCommentsForPost, postComment } from '../../../api/api';
import { CommentData, CreateCommentInput } from '../../../models/comment/CommentModel';
import Comment from './Comment';
import './Comment.css';

interface CommentsSectionProps {
    postId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ postId }) => {
    const [comments, setComments] = useState<CommentData[]>([]);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const testUserId = "66380f8f7af302d62f105e55";

    useEffect(() => {
        const fetchComments = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const fetchedComments = await getCommentsForPost(postId);
                setComments(fetchedComments);
            } catch (error) {
                console.error('Failed to load comments', error);
                setError('Failed to fetch comments. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchComments();
    }, [postId]);

    const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!newComment.trim()) return;

        const userInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;
        if (!userInfo || userInfo._id !== testUserId) {
            setError('You are not authorized to post.');
            return;
        }

        setIsLoading(true);
        setError(null);

        const commentData: CreateCommentInput = {
            text: newComment,
            postId,
            userId: userInfo._id,
        };

        try {
            const comment = await postComment(commentData);
            setComments([...comments, comment]);
            setNewComment('');
        } catch (error) {
            console.error('Failed to post comment:', error);
            setError(`Failed to create comment: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="comments-section">
            <form className="comments-form" onSubmit={handleCommentSubmit}>
                <textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Posting...' : 'Post Comment'}
                </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {isLoading ? (
                <div className="loading-message">Loading comments...</div>
            ) : (
                comments.map((comment) => (
                    <Comment key={comment._id} comment={comment} />
                ))
            )}
        </div>
    );
};

export default CommentsSection;
