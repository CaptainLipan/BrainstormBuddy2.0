import React from 'react';
import { CommentData } from '../../../models/comment/CommentModel';
import './Comment.css';

interface CommentProps {
    comment: CommentData;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div className="comment">
            <div className="comment-author">{comment._creator.username}</div>
            <div className="comment-text">{comment.text}</div>
            <div className="comment-time">{new Date(comment.createdAt).toLocaleString()}</div>
        </div>
    );
};

export default Comment;
