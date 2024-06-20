import { Request, Response } from 'express';
import Comment from '../models/Comment';
import Post from '../models/Post';

const commentController = {
    post: async (req: Request, res: Response): Promise<void> => {
        const { text, postId, userId } = req.body;

        const comment = new Comment({
            text,
            _creator: userId,
            _post: postId,
        });

        try {
            const newComment = await comment.save();
            const populatedComment = await Comment.findById(newComment._id).populate('_creator', 'username');

            await Post.findByIdAndUpdate(
                postId,
                { $push: { _comments: newComment._id } },
                { new: true }
            );

            res.status(200).json({
                success: true,
                data: populatedComment
            });
        } catch (err: any) {
            res.status(500).json({
                message: err.message || 'Error saving comment',
            });
        }
    },

    getCommentsForPost: async (req: Request, res: Response): Promise<void> => {
        const postId = req.params.postId;

        try {
            const comments = await Comment.find({ _post: postId, isDeleted: false }).populate('_creator', 'username');

            if (comments.length) {
                res.status(200).json({
                    success: true,
                    comments: comments
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'No comments found for this post'
                });
            }
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message || 'Error retrieving comments'
            });
        }
    },

    deleteComment: async (req: Request, res: Response): Promise<void> => {
        const { commentId } = req.params;

        try {
            const comment = await Comment.findByIdAndUpdate(commentId, { isDeleted: true }, { new: true });

            if (!comment) {
                res.status(404).json({
                    success: false,
                    message: 'Comment not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Comment deleted successfully'
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message || 'Error deleting comment'
            });
        }
    }
};

export default commentController;
