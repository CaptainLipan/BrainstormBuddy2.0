// src/routes.ts

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
router.get('/', basicController.get); // Home or base route

// User routes
router.post('/users', createUser); // Endpoint to create a user

// Post routes
router.post('/post', postController.post); // Create a post
router.get('/posts', postController.getAll); // Get all posts

// Comment routes
router.post('/comment', commentController.post); // Create a comment

// Comment count routes
router.get('/post/:postId/comments/count', commentCountController.getCount);



// Routes for handling votes on posts
router.post('/post/upvote', voteController.upVotePost);
router.post('/post/downvote', voteController.downVotePost);
router.post('/post/undovote', voteController.undoVotePost);

// Routes for handling votes on comments
router.post('/comment/upvote', voteController.upVoteComment);
router.post('/comment/downvote', voteController.downVoteComment);
router.post('/comment/undovote', voteController.undoVoteComment);

// Route to get vote count for a post
router.get('/post/:postId/votes', voteCountController.countPostVotes);

// Route to get vote count for a comment
router.get('/comment/:commentId/votes', voteCountController.countCommentVotes);



export default router;
