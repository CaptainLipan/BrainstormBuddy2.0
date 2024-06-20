import express from 'express';
import postController from './controllers/postController';
import basicController from './controllers/basicController';
import { createUser } from './controllers/userController';
import commentController from './controllers/commentController';
import voteController from "./controllers/voteController";
import voteCountController from "./controllers/voteCountController";
import commentCountController from "./controllers/commentCountController";

const router = express.Router();

// Basic routes
router.get('/', basicController.get);

// User routes
router.post('/users', createUser);

// Post routes
router.post('/post', postController.post);
router.get('/posts', postController.getAll);
router.get('/post/:postId', postController.getById);

// Comment routes
router.post('/comment', commentController.post);
router.get('/post/:postId/comments', commentController.getCommentsForPost);

// Comment count routes
router.get('/post/:postId/comments/count', commentCountController.getCount);

// Unified voting routes
router.post('/vote/toggle/:type/:id/:voteType', voteController.toggleVote);

// Route to get vote count for a post
router.get('/post/:postId/votes', voteCountController.countPostVotes);

// Route to get vote count for a comment
router.get('/comment/:commentId/votes', voteCountController.countCommentVotes);

export default router;
