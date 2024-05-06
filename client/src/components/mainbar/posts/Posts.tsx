import React, { useEffect, useState } from 'react';
import { Post } from '../../../models/post/PostModel';
import { fetchPosts, fetchPostVotes } from '../../../api/api';
import './Posts.css';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import Button from '../../button/Button';
import { ModeComment, Share } from "@mui/icons-material";

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [votes, setVotes] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const initFetch = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
// Fetch votes for each post
                data.forEach(async (post: Post) => {
                    const voteData = await fetchPostVotes(post._id);
                    setVotes((prevVotes) => ({
                        ...prevVotes,
                        [post._id]: voteData.count  // assuming the backend sends back an object with a count property
                    }));
                });
            } catch (error) {
                console.error('Error loading posts:', error);
                setPosts([]);
            }
        };

        initFetch();
    }, []);

    return (
        <div className="posts-wrapper">
            {posts.map((post: Post) => ( // Explicitly specify the type of post as Post
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
