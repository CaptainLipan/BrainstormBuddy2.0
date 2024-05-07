import React, { useEffect, useState } from 'react';
import { fetchPosts, fetchPostVotes, upvotePost, downvotePost, undoVotePost } from '../../../api/api';
import './Posts.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Button from '../../button/Button';
import { ModeComment, Share } from "@mui/icons-material";
import { Post } from '../../../models/post/PostModel';

interface PostData {
    _id: string;
    title: string;
    text: string;
    link?: string;
    userId: string;
    _creator: { username: string };
    createdAt: string;
    updatedAt?: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const userId = '66380f8f7af302d62f105e55'; // Actual user ID

    useEffect(() => {
        const initFetch = async () => {
            try {
                const data: PostData[] = await fetchPosts();

                const postsWithVotes: Promise<Post>[] = data.map(async (post) => {
                    const votesCount = await fetchPostVotes(post._id);
                    return {
                        ...post,
                        _comments: [],
                        upvotes: votesCount,
                    };
                });

                const enrichedPosts: Post[] = await Promise.all(postsWithVotes);

                setPosts(enrichedPosts);
            } catch (error) {
                console.error('Error loading posts:', error);
                setPosts([]);
            }
        };

        initFetch();
    }, []);

    const hasUpvoted = (post: Post) => post.upvoted === true;
    const hasDownvoted = (post: Post) => post.downvoted === true;

    const handleUpvote = async (postId: string) => {
        try {
            const post = posts.find(post => post._id === postId);
            if (post) {
                if (post.userId === userId) {
                    // User has already upvoted, so undo the vote
                    await undoVotePost({ postId, userId });
                    const updatedPosts = posts.map(post =>
                        post._id === postId ? { ...post, upvotes: post.upvotes - 1, upvoted: false } : post
                    );
                    setPosts(updatedPosts);
                } else {
                    if (post.userId !== userId && post.downvoted) {
                        // User previously downvoted, now upvote
                        await upvotePost({ postId, userId });
                        const updatedPosts = posts.map(post =>
                            post._id === postId ? { ...post, upvotes: post.upvotes + 1, downvoted: false } : post
                        );
                        setPosts(updatedPosts);
                    } else {
                        // User hasn't voted, upvote
                        await upvotePost({ postId, userId });
                        const updatedPosts = posts.map(post =>
                            post._id === postId ? { ...post, upvotes: post.upvotes + 1, upvoted: true } : post
                        );
                        setPosts(updatedPosts);
                    }
                }
            }
        } catch (error) {
            console.error('Error upvoting post:', error);
        }
    };

    const handleDownvote = async (postId: string) => {
        try {
            const post = posts.find(post => post._id === postId);
            if (post) {
                if (post.userId === userId) {
                    // User has already downvoted, so undo the vote
                    await undoVotePost({ postId, userId });
                    const updatedPosts = posts.map(post =>
                        post._id === postId ? { ...post, upvotes: post.upvotes + 1, downvoted: false } : post
                    );
                    setPosts(updatedPosts);
                } else {
                    if (post.userId !== userId && post.upvoted) {
                        // User previously upvoted, now downvote
                        await downvotePost({ postId, userId });
                        const updatedPosts = posts.map(post =>
                            post._id === postId ? { ...post, upvotes: post.upvotes - 1, upvoted: false } : post
                        );
                        setPosts(updatedPosts);
                    } else {
                        // User hasn't voted, downvote
                        await downvotePost({ postId, userId });
                        const updatedPosts = posts.map(post =>
                            post._id === postId ? { ...post, upvotes: post.upvotes - 1, downvoted: true } : post
                        );
                        setPosts(updatedPosts);
                    }
                }
            }
        } catch (error) {
            console.error('Error downvoting post:', error);
        }
    };


    return (
        <div className="posts-wrapper">
            {posts.map((post: Post) => (
                <div key={post._id} className="post">
                    <div className="post-sidebar">
                        <ThumbUpOffAltIcon className="upvote" onClick={() => handleUpvote(post._id)} />
                        <span>{post.upvotes}</span>
                        <ThumbDownOffAltIcon className="downvote" onClick={() => handleDownvote(post._id)} />
                    </div>
                    <div className="post-title">
                        <span>Posted by {post._creator.username}</span>
                        <div className="post-title-username">{post.title}</div>
                        <div className="post-title-time">{new Date(post.createdAt).toLocaleString()}</div>
                        <Button label="+Follow" className="follow-button" />
                    </div>
                    <div className="post-body">{post.text}</div>
                    <div className="post-footer">
                        <div className="comments footer-action">
                            <ModeComment />
                            <span>{post._comments.length}</span>
                        </div>
                        <div className="share footer-action">
                            <Share />
                            <span>Share</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Posts;
