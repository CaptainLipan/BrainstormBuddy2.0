// src/controllers/postController.ts
import { Request, Response } from 'express';
import Post, { IPost } from '../models/Post';  // Ensure you export IPost from the Post model file

const postController: any = {};  // Define the type more specifically if possible

postController.post = async (req: Request, res: Response): Promise<Response> => {
    const {
        title,
        text,
        link,
        userId,
    } = req.body;

    const post = new Post({
        title,
        text,
        link,
        _creator: userId,
    } as IPost);

    try {
        const newPost = await post.save();
        return res.status(200).json({
            success: true,
            data: newPost,
        });
    } catch (err:any) {
        return res.status(500).json({
            message: err.message  // More specific error handling
        });
    }
};

postController.getAll = async (req: Request, res: Response): Promise<Response> => {
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
            data: posts,
        });
    } catch (err:any) {
        return res.status(500).json({
            message: err.message
        });
    }
};

export default postController;
