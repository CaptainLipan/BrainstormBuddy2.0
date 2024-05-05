
import { Request, Response } from 'express';

interface BasicController {
    get: (req: Request, res: Response) => void;
}

const basicController: BasicController = {
    get(req, res) {
        res.json({
            message: 'Welcome to our API!'
        });
    }
};

export default basicController;