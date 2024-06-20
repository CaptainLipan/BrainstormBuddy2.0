import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';
import Comment from '../models/Comment';

const postController = {
    post: async (req: Request, res: Response): Promise<void> => {
        const { title, text, link, userId } = req.body;

        const post = new Post({
            title,
            text,
            link,
            _creator: userId
        });

        try {
            const newPost = await post.save();
            res.status(201).json({
                success: true,
                data: newPost
            });
        } catch (err: any) {
            if (err.name === 'ValidationError') {
                res.status(400).json({
                    success: false,
                    message: 'Validation Error',
                    errors: err.errors
                });
            } else {
                res.status(500).json({
                    success: false,
                    message: err.message || 'Internal Server Error'
                });
            }
        }
    },

    getAll: async (req: Request, res: Response): Promise<void> => {
        try {
            const posts = await Post.find({ isDeleted: false }).populate({
                path: '_creator',
                select: 'username createdAt -_id'
            }).populate({
                path: '_comments',
                select: 'text createdAt _creator',
                match: { isDeleted: false }
            });

            res.status(200).json({
                success: true,
                data: posts
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: err.message || 'Internal Server Error'
            });
        }
    },

    getById: async (req: Request, res: Response): Promise<void> => {
        const { postId } = req.params;

        try {
            const post = await Post.findById(postId)
                .populate('_creator', 'username')
                .lean() as IPost;

            if (!post) {
                res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
                return;
            }

            post.commentsCount = await Comment.countDocuments({ _post: post._id, isDeleted: false });

            res.status(200).json({
                success: true,
                data: post
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: 'Error fetching post',
                error: err.message
            });
        }
    },

    deletePost: async (req: Request, res: Response): Promise<void> => {
        const { postId } = req.params;

        try {
            const post = await Post.findByIdAndUpdate(postId, { isDeleted: true }, { new: true });

            if (!post) {
                res.status(404).json({
                    success: false,
                    message: 'Post not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Post deleted successfully'
            });
        } catch (err: any) {
            res.status(500).json({
                success: false,
                message: 'Error deleting post',
                error: err.message
            });
        }
    }
};

export default postController;
