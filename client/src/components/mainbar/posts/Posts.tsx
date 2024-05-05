    import React from 'react';
    import './Posts.css';
    import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
    import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
    import Button from '../../button/Button';
    import {ModeComment} from "@mui/icons-material";
    import {Share} from "@mui/icons-material";
    export default function Posts() {
        return (
            <div className="posts-wrapper">
                <div className="post">
                    <div className="post-sidebar">
                        <ThumbUpOffAltIcon className="upvote"/>
                        <span>Number</span>
                        <ThumbDownOffAltIcon className="downvote"/>

                    </div>

                    <div className="post-title">
                        <span>Posted by u/</span>
                        <div className="post-title-username">Username</div>
                        <div className="post-title-time">Time</div>
                        <div className="spacer"></div>
                        <Button label="+Follow" className="follow-button" />
                    </div>
                    <div className="post-body">

                    </div>
                    <div className="post-footer">
                        <div className="comments footer-action">
                            <ModeComment/>
                            <span>Number</span>
                        </div>

                        <div className="share footer-action">
                            <Share/>
                            <span>Share</span>
                        </div>


                    </div>
                </div>


            </div>
        )
    }
