import { Request, Response } from 'express';
import db from '../models';  // Make sure your models are imported correctly

interface VoteRequest extends Request {
    body: {
        postId?: string;
        commentId?: string;
        userId: string;
    }
}

const voteController = {
    async upVotePost(req: VoteRequest, res: Response) {
        const { postId, userId } = req.body;

        try {
            const existingVote = await db.Vote.findOne({ postId, userId, voteType: 'upvote' });
            if (existingVote) {
                return res.status(400).json({ success: false, message: "User has already upvoted this post." });
            }

            const downvote = await db.Vote.findOneAndDelete({ postId, userId, voteType: 'downvote' });
            const newVote = new db.Vote({ postId, userId, voteType: 'upvote' });
            await newVote.save();

            res.status(200).json({ success: true, message: "Post upvoted successfully." });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async downVotePost(req: VoteRequest, res: Response) {
        const { postId, userId } = req.body;

        try {
            const existingVote = await db.Vote.findOne({ postId, userId, voteType: 'downvote' });
            if (existingVote) {
                return res.status(400).json({ success: false, message: "User has already downvoted this post." });
            }

            const upvote = await db.Vote.findOneAndDelete({ postId, userId, voteType: 'upvote' });
            const newVote = new db.Vote({ postId, userId, voteType: 'downvote' });
            await newVote.save();

            res.status(200).json({ success: true, message: "Post downvoted successfully." });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async undoVotePost(req: VoteRequest, res: Response) {
        const { postId, userId } = req.body;

        try {
            const deletedVote = await db.Vote.findOneAndDelete({ postId, userId });
            if (!deletedVote) {
                return res.status(404).json({ success: false, message: "Vote not found." });
            }

            res.status(200).json({ success: true, message: "Vote on post undone successfully." });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async upVoteComment(req: VoteRequest, res: Response) {
        const { commentId, userId } = req.body;

        try {
            const existingVote = await db.Vote.findOne({ commentId, userId, voteType: 'upvote' });
            if (existingVote) {
                return res.status(400).json({ success: false, message: "User has already upvoted this comment." });
            }

            const downvote = await db.Vote.findOneAndDelete({ commentId, userId, voteType: 'downvote' });
            const newVote = new db.Vote({ commentId, userId, voteType: 'upvote' });
            await newVote.save();

            res.status(200).json({ success: true, message: "Comment upvoted successfully." });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async downVoteComment(req: VoteRequest, res: Response) {
        const { commentId, userId } = req.body;

        try {
            const existingVote = await db.Vote.findOne({ commentId, userId, voteType: 'downvote' });
            if (existingVote) {
                return res.status(400).json({ success: false, message: "User has already downvoted this comment." });
            }

            const upvote = await db.Vote.findOneAndDelete({ commentId, userId, voteType: 'upvote' });
            const newVote = new db.Vote({ commentId, userId, voteType: 'downvote' });
            await newVote.save();

            res.status(200).json({ success: true, message: "Comment downvoted successfully." });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async undoVoteComment(req: VoteRequest, res: Response) {
        const { commentId, userId } = req.body;

        try {
            const deletedVote = await db.Vote.findOneAndDelete({ commentId, userId });
            if (!deletedVote) {
                return res.status(404).json({ success: false, message: "Vote not found." });
            }

            res.status(200).json({ success: true, message: "Vote on comment undone successfully." });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};

export default voteController;