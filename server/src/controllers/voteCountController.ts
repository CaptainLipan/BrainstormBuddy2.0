// src/controllers/voteCountController.ts
import { Request, Response } from 'express';
import db from '../models';

const voteCountController = {
    async countPostVotes(req: Request, res: Response) {
        const { postId } = req.params;

        try {
            const upvotes = await db.Vote.countDocuments({ postId, voteType: 'upvote' });
            const downvotes = await db.Vote.countDocuments({ postId, voteType: 'downvote' });
            const netVotes = upvotes - downvotes;

            res.status(200).json({
                success: true,
                netVotes,
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    async countCommentVotes(req: Request, res: Response) {
        const { commentId } = req.params;

        try {
            const upvotes = await db.Vote.countDocuments({ commentId, voteType: 'upvote' });
            const downvotes = await db.Vote.countDocuments({ commentId, voteType: 'downvote' });
            const netVotes = upvotes - downvotes;

            res.status(200).json({
                success: true,
                netVotes,
            });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};

export default voteCountController;
