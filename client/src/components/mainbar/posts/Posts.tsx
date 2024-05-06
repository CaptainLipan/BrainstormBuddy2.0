import React, { useEffect, useState } from 'react';
import { Post } from '../../../models/post/PostModel';
import { fetchPosts, fetchPostVotes, fetchCommentsCount } from '../../../api/api';
import './Posts.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Button from '../../button/Button';
import { ModeComment, Share } from "@mui/icons-material";

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [votes, setVotes] = useState<{ [key: string]: number }>({});
    const [commentsCounts, setCommentsCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const initFetch = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);

                for (const post of data) {
                    const netVotes = await fetchPostVotes(post._id);
                    const commentsCount = await fetchCommentsCount(post._id);  // Fetching comments count

                    setVotes(prevVotes => ({
                        ...prevVotes,
                        [post._id]: netVotes  // Updating votes state
                    }));

                    setCommentsCounts(prevCounts => ({
                        ...prevCounts,
                        [post._id]: commentsCount  // Updating comments count state
                    }));
                }
            } catch (error) {
                console.error('Error loading posts:', error);
                setPosts([]);
            }
        };

        initFetch().catch(error => console.error('Failed to initialize fetch:', error));
    }, []);

    return (
        <div className="posts-wrapper">
            {posts.map((post: Post) => (
                <div key={post._id} className="post">
                    <div className="post-sidebar">
                        <ThumbUpOffAltIcon className="upvote"/>
                        <span>{votes[post._id] || 0}</span>
                        <ThumbDownOffAltIcon className="downvote"/>
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
                            <span>{commentsCounts[post._id] || 0}</span>
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
