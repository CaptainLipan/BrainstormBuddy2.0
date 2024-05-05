// src/models/Post.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the Post document
export interface IPost extends Document {
    title: string;
    text: string;
    link?: string; // Optional link
    _creator: mongoose.Schema.Types.ObjectId; // Reference to a User document
    createdAt: Date;
    updatedAt: Date;
}

// Schema definition for the Post
const PostSchema: Schema<IPost> = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    link: { type: String },
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    timestamps: true // Mongoose uses this option to automatically add `createdAt` and `updatedAt` fields
});

// Creating the model
const Post: Model<IPost> = mongoose.model<IPost>('Post', PostSchema);

export default Post;
