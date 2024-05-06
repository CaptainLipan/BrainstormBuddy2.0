import { Request, Response } from 'express';
import Comment from '../models/Comment';


const commentCountController: any = {};

// Function to get the comment count for a specific post
commentCountController.getCount = async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;

    try {
        const count = await Comment.countDocuments({ _post: postId, isDeleted: false });
        res.json({
            success: true,
            count
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: 'Error fetching comment count',
            error: error.message
        });
    }
};

export default commentCountController;
