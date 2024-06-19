import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchPostVotes, postComment, getCommentsForPost, fetchCommentsCount } from '../../../api/api';
import './Posts.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Button from '../../button/Button';
import { ModeComment, Share } from "@mui/icons-material";
import { PostWithCommentsCount } from '../../../models/post/PostModel'; // Adjust the import
import CommentsSection from "../comments/CommentsSection";
import { handleVote } from './handleVote';

interface PostsProps {
    currentFilter: string;
}

const Posts: React.FC<PostsProps> = ({ currentFilter }) => {
    const [posts, setPosts] = useState<PostWithCommentsCount[]>([]);
    const userId = 'YOUR_USER_ID';  // This should be dynamically set based on logged-in user info

    useEffect(() => {
        const initFetch = async () => {
            const data = await fetchPosts();
            const postsWithVotes = await Promise.all(data.map(async post => {
                const votesCount = await fetchPostVotes(post._id);
                const commentsCount = await fetchCommentsCount(post._id);
                return {
                    ...post,
                    upvotes: votesCount,
                    upvoted: false,
                    downvoted: false,
                    _comments: [],
                    showComments: false,
                    commentsCount,
                } as PostWithCommentsCount;
            }));
            setPosts(postsWithVotes);
        };

        initFetch();
    }, [currentFilter]);

    return (
        <div className="posts-wrapper">
            {posts.map(post => (
                <PostItem key={post._id} post={post} setPosts={setPosts} userId={userId} />
            ))}
        </div>
    );
};

interface PostItemProps {
    post: PostWithCommentsCount;
    setPosts: React.Dispatch<React.SetStateAction<PostWithCommentsCount[]>>;
    userId: string;
}

const PostItem: React.FC<PostItemProps> = ({ post, setPosts, userId }) => {
    const [localPost, setLocalPost] = useState<PostWithCommentsCount>(post);

    const handleLocalVote = async (type: 'upvote' | 'downvote') => {
        await handleVote(localPost, setLocalPost, type);
        setPosts(prevPosts => prevPosts.map(p => p._id === localPost._id ? localPost : p));
    };

    const handleCommentIconClick = async () => {
        if (!localPost.showComments && localPost._comments.length === 0) {
            const comments = await getCommentsForPost(localPost._id);
            setLocalPost(prevPost => ({ ...prevPost, _comments: comments, showComments: !prevPost.showComments }));
        } else {
            setLocalPost(prevPost => ({ ...prevPost, showComments: !prevPost.showComments }));
        }
    };

    const handleAddComment = async (newCommentText: string) => {
        if (!newCommentText.trim()) return;
        try {
            const newComment = await postComment({ text: newCommentText, postId: localPost._id, userId }); // Update the postComment call
            setLocalPost(prevPost => ({
                ...prevPost,
                _comments: [...prevPost._comments, newComment],
                showComments: true
            }));
            setPosts(prevPosts => prevPosts.map(p => p._id === localPost._id ? { ...p, _comments: [...p._comments, newComment] } : p));
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="post">
            <div className="post-sidebar">
                <ThumbUpOffAltIcon
                    className={`upvote ${localPost.upvoted ? 'active' : ''}`}
                    onClick={() => handleLocalVote('upvote')}
                />
                <span>{localPost.upvotes}</span>
                <ThumbDownOffAltIcon
                    className={`downvote ${localPost.downvoted ? 'active' : ''}`}
                    onClick={() => handleLocalVote('downvote')}
                />
            </div>
            <div className="post-title">
                <span>Posted by {localPost._creator.username}</span>
                <div className="post-title-username">{localPost.title}</div>
                <div className="post-title-time">{new Date(localPost.createdAt).toLocaleString()}</div>
                <Button label="+ Follow" className="follow-button" />
            </div>
            <div className="post-body">{localPost.text}</div>
            <div className="comments-area">
                {localPost.showComments && <CommentsSection postId={localPost._id} />}
            </div>
            <div className="post-footer">
                <ModeComment onClick={handleCommentIconClick} />
                <span>{localPost._comments.length} Comments</span>
                <Share />
                <span>Share</span>
            </div>
        </div>
    );
};

export default Posts;
