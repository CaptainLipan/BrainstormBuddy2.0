// Comment.tsx
import React from 'react';
import { IComment } from '../../../models/comment/CommentModel';
import './Comment.css'
interface CommentProps {
    comment: IComment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    return (
        <div className="comment">
            <p className="comment-text">{comment.text}</p>
            <div className="comment-footer">
                <span className="comment-username">{comment._creator.username}</span>
                <span className="comment-time">{new Date(comment.createdAt).toLocaleString()}</span>
            </div>
        </div>
    );
};

export default Comment;