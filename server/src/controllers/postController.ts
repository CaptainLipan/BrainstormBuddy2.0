import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';  // Ensure your model exports IPost if needed, otherwise adjust

// Define a more specific type for the controller
interface IPostController {
    post: (req: Request, res: Response) => Promise<Response>;
    getAll: (req: Request, res: Response) => Promise<Response>;
}

const postController: IPostController = {
    post: async (req: Request, res: Response): Promise<Response> => {
        const { title, text, link, userId } = req.body;

        const post = new Post({
            title,
            text,
            link,
            _creator: userId
        });

        try {
            const newPost = await post.save();
            return res.status(201).json({
                success: true,
                data: newPost
            });
        } catch (err: any) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    success: false,
                    message: 'Validation Error',
                    errors: err.errors
                });
            }
            return res.status(500).json({
                success: false,
                message: err.message || 'Internal Server Error'
            });
        }
    },

    getAll: async (req: Request, res: Response): Promise<Response> => {
        try {
            const posts = await Post.find({}).populate({
                path: '_creator',
                select: 'username createdAt -_id'
            }).populate({
                path: '_comments',
                select: 'text createdAt _creator',
                match: { 'isDeleted': false }
            });

            return res.status(200).json({
                success: true,
                data: posts
            });
        } catch (err: any) {
            return res.status(500).json({
                success: false,
                message: err.message || 'Internal Server Error'
            });
        }
    }
};

export default postController;