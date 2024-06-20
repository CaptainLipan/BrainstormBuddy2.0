import { Request, Response } from 'express';
import db from '../models';  // Ensure this path correctly references your models

export const createUser = (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = new db.User({
        username,
        email,
        password
    });

    user.save()
        .then((newUser) => {
            res.status(200).json({
                success: true,
                data: newUser
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: err.message
            });
        });
};

export default { createUser };
