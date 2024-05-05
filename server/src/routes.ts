
// src/routes.ts

import express from 'express';
import postController from './controllers/postController';
import basicController from "./controllers/basicController";

const router = express.Router(); // Use express.Router() instead of express()

// Post routes
router.post('/post', postController.post); // Create a post
router.get('/posts', postController.getAll); // Get all posts

// Basic routes
router.get('/', basicController.get); // Get all posts
export default router; // Use ES6 module export
