import express from 'express';
import postController from './controllers/postController';
import commentController from './controllers/commentController';
import voteController from './controllers/voteController';
import voteCountController from './controllers/voteCountController';
import commentCountController from './controllers/commentCountController';

const router = express.Router();

// Post routes
router.post('/post', postController.post);
router.get('/posts', postController.getAll);
router.get('/post/:postId', postController.getById);
router.delete('/post/:postId', postController.deletePost);

// Comment routes
router.post('/comment', commentController.post);
router.get('/post/:postId/comments', commentController.getCommentsForPost);
router.delete('/comment/:commentId', commentController.deleteComment);

// Voting routes
router.post('/vote/toggle/:type/:id/:voteType', voteController.toggleVote);

// Vote count routes
router.get('/post/:postId/votes', voteCountController.countPostVotes);
router.get('/comment/:commentId/votes', voteCountController.countCommentVotes);

// Comment count routes
router.get('/post/:postId/comments/count', commentCountController.getCount);

export default router;
