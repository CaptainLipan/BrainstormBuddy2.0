    import { Request, Response } from 'express';
    import db from '../models';
    import mongoose from 'mongoose';

    const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

    const voteCountController = {
        async countPostVotes(req: Request, res: Response) {
            const { postId } = req.params;

            if (!isValidObjectId(postId)) {
                return res.status(400).json({ success: false, message: "Invalid postId" });
            }

            try {
                const upvotes = await db.Vote.countDocuments({ postId, voteType: 'upvote' });
                const downvotes = await db.Vote.countDocuments({ postId, voteType: 'downvote' });
                const netVotes = upvotes - downvotes;

                res.status(200).json({
                    success: true,
                    netVotes,
                });
            } catch (error) {
                console.error('Error counting post votes:', error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        },

        async countCommentVotes(req: Request, res: Response) {
            const { commentId } = req.params;

            if (!isValidObjectId(commentId)) {
                return res.status(400).json({ success: false, message: "Invalid commentId" });
            }

            try {
                const upvotes = await db.Vote.countDocuments({ commentId, voteType: 'upvote' });
                const downvotes = await db.Vote.countDocuments({ commentId, voteType: 'downvote' });
                const netVotes = upvotes - downvotes;

                res.status(200).json({
                    success: true,
                    netVotes,
                });
            } catch (error) {
                console.error('Error counting comment votes:', error);
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        },
    };

    export default voteCountController;