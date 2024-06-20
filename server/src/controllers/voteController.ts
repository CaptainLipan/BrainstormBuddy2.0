// src/controllers/voteController.ts
import { Request, Response } from 'express';
import Vote from "../models/Vote";  // Ensure this path is correct
import Post from "../models/Post";  // Ensure this path is correct
import Comment from "../models/Comment";  // Ensure this path is correct

type VoteType = 'upvote' | 'downvote';  // Define the type for clarity and reuse

const voteController = {
    async toggleVote(req: Request, res: Response) {
        const { type, id, voteType } = req.params;
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required." });
        }

        // Validate voteType
        if (!['upvote', 'downvote'].includes(voteType)) {
            return res.status(400).json({ success: false, message: "Invalid vote type." });
        }

        const filter = {
            userId: userId,
            [type === 'post' ? 'postId' : 'commentId']: id
        };

        try {
            let vote = await Vote.findOne(filter);
            let voteUpdated = false;

            if (vote) {
                if (vote.voteType !== voteType) {
                    vote.voteType = voteType as VoteType;  // Type assertion here
                    await vote.save();
                    voteUpdated = true;
                } else {
                    await Vote.findByIdAndDelete(vote._id);
                }
            } else {
                const newVote = new Vote({
                    userId,
                    [type === 'post' ? 'postId' : 'commentId']: id,
                    voteType: voteType as VoteType  // Type assertion here
                });
                await newVote.save();
                voteUpdated = true;
            }

            // Calculate net votes
            const upvotes = await Vote.countDocuments({ [type === 'post' ? 'postId' : 'commentId']: id, voteType: 'upvote' });
            const downvotes = await Vote.countDocuments({ [type === 'post' ? 'postId' : 'commentId']: id, voteType: 'downvote' });
            const netVotes = upvotes - downvotes;

            // Return updated information
            res.json({
                success: true,
                netVotes: netVotes,
                upvoted: voteUpdated && voteType === 'upvote',
                downvoted: voteUpdated && voteType === 'downvote'
            });
        } catch (error: any) {
            console.error('Error processing vote:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default voteController;
