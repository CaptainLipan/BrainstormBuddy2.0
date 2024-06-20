import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchPostVotes, postComment, getCommentsForPost, fetchPostById, fetchCommentsCount } from '../../../api/api';
import { CreateCommentInput, CommentData } from '../../../models/comment/CommentModel';
import { PostWithCommentsCount } from '../../../models/post/PostModel';
import './Posts.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Button from '../../button/Button';
import { ModeComment, Share } from "@mui/icons-material";
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
            const postsWithVotesAndComments = await Promise.all(data.map(async post => {
                const votesCount = await fetchPostVotes(post._id);
                const commentsCount = await fetchCommentsCount(post._id);
                return {
                    ...post,
                    upvotes: votesCount,
                    commentsCount: commentsCount,
                    upvoted: false,
                    downvoted: false,
                    _comments: [],
                    showComments: false
                };
            }));
            setPosts(postsWithVotesAndComments);
        };

        initFetch();
    }, [currentFilter]);

    const refreshPost = async (postId: string) => {
        try {
            const updatedPost = await fetchPostById(postId);
            const commentsCount = await fetchCommentsCount(postId);
            setPosts(prevPosts => prevPosts.map(p => p._id === postId ? {
                ...p,
                ...updatedPost,
                commentsCount: commentsCount,
                _comments: updatedPost._comments,
                upvotes: updatedPost.upvotes,
                showComments: p.showComments  // Retain the current showComments state
            } : p));
        } catch (error) {
            console.error('Error refreshing post:', error);
        }
    };

    return (
        <div className="posts-wrapper">
            {posts.map(post => (
                <PostItem key={post._id} post={post} setPosts={setPosts} userId={userId} refreshPost={refreshPost} />
            ))}
        </div>
    );
};

interface PostItemProps {
    post: PostWithCommentsCount;
    setPosts: React.Dispatch<React.SetStateAction<PostWithCommentsCount[]>>;
    userId: string;
    refreshPost: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, setPosts, userId, refreshPost }) => {
    const [localPost, setLocalPost] = useState<PostWithCommentsCount>(post);

    const handleLocalVote = async (type: 'upvote' | 'downvote') => {
        await handleVote(localPost, setLocalPost, type);
        setPosts(prevPosts => prevPosts.map(p => p._id === localPost._id ? localPost : p));
    };

    const handleCommentIconClick = async () => {
        try {
            if (!localPost.showComments && localPost._comments.length === 0) {
                const comments = await getCommentsForPost(localPost._id);
                setLocalPost(prevPost => ({ ...prevPost, _comments: comments, showComments: !prevPost.showComments }));
            } else {
                setLocalPost(prevPost => ({ ...prevPost, showComments: !prevPost.showComments }));
            }
        } catch (error) {
            console.error('Error fetching comments:', error);
            setLocalPost(prevPost => ({ ...prevPost, showComments: !prevPost.showComments }));
        }
    };

    const handleAddComment = async (newCommentText: string) => {
        if (!newCommentText.trim()) return;
        const commentData: CreateCommentInput = {
            text: newCommentText,
            postId: localPost._id,
            userId
        };
        try {
            await postComment(commentData);
            refreshPost(localPost._id); // Refresh post data after adding a comment
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
                {localPost.showComments && <CommentsSection postId={localPost._id} onCommentAdded={() => refreshPost(localPost._id)} />}
            </div>
            <div className="post-footer">
                <ModeComment onClick={handleCommentIconClick} />
                <span>{localPost.commentsCount} Comments</span>
                <Share />
                <span>Share</span>
            </div>
        </div>
    );
};

export default Posts;
