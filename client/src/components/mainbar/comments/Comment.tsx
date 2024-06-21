import React, { useState } from 'react';
import { CommentData } from '../../../models/comment/CommentModel';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { handleCommentVote } from './handleCommentVote';
import { Delete } from '@mui/icons-material';
import { deleteComment } from '../../../api/api';
import './Comment.css';

interface CommentProps {
    comment: CommentData;
    onDeleteComment: (commentId: string) => void; // Add this prop
}

const Comment: React.FC<CommentProps> = ({ comment, onDeleteComment }) => {
    const [localComment, setLocalComment] = useState<CommentData>(comment);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleVote = async (type: 'upvote' | 'downvote') => {
        await handleCommentVote(localComment, setLocalComment, type);
    };

    const confirmDeleteComment = async (commentId: string) => {
        try {
            await deleteComment(commentId);
            onDeleteComment(commentId); // Call the onDeleteComment prop
        } catch (error) {
            console.error('Error deleting comment:', error);
        } finally {
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="comment">
            <div className="comment-sidebar">
                <ThumbUpOffAltIcon
                    className={`upvote ${localComment.upvoted ? 'active' : ''}`}
                    onClick={() => handleVote('upvote')}
                />
                <span>{localComment.upvotes}</span>
                <ThumbDownOffAltIcon
                    className={`downvote ${localComment.downvoted ? 'active' : ''}`}
                    onClick={() => handleVote('downvote')}
                />
                <Delete className="delete-button" onClick={() => setShowDeleteConfirm(true)} />
            </div>
            <div className="comment-content">
                <div className="comment-author">{localComment._creator.username}</div>
                <div className="comment-text">{localComment.text}</div>
            </div>
            <div className="comment-time">
                {new Date(localComment.createdAt).toLocaleString()}
            </div>
            {showDeleteConfirm && (
                <div className="delete-confirm-modal">
                    <div className="delete-confirm-content">
                        <p>Are you sure you want to delete this comment?</p>
                        <button onClick={() => confirmDeleteComment(localComment._id)}>Yes</button>
                        <button onClick={() => setShowDeleteConfirm(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
