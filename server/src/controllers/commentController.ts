// Assuming the Comment and Post models are imported with their interfaces
import db from '../models/index';


import { Request, Response } from 'express';

const commentController: any = {};

commentController.post = (req: Request, res: Response): void => {
    const {
        text,
        postId,
        userId
    } = req.body;

    // Validation should be handled here if necessary

    const comment = new db.Comment({
        text,
        _creator: userId,
        _post: postId,
    });

    comment.save().then((newComment) => {
        db.Post.findByIdAndUpdate(
            postId,
            { $push: { _comments: newComment._id } },
            { new: true } // Return the modified document rather than the original
        ).then((existingPost) => {
            res.status(200).json({
                success: true,
                data: newComment,
                postUpdated: existingPost,
            });
        }).catch((err: any) => {
            res.status(500).json({
                message: err.message || 'Error updating post with new comment',
            });
        });
    }).catch((err: any) => {
        res.status(500).json({
            message: err.message || 'Error saving comment',
        });
    });
};
commentController.getCommentsForPost = (req: Request, res: Response): void => {
    const postId = req.params.postId;  // Get the postId from URL parameters

    db.Comment.find({ _post: postId, isDeleted: false })  // Query for comments related to the postId and not deleted
        .populate('_creator', 'username')  // Optionally populate the creator details
        .then(comments => {
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
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err.message || 'Error retrieving comments'
            });
        });
};

export default commentController;
