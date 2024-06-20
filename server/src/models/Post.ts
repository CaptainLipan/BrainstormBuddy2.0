// src/models/Post.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string;
    text: string;
    link?: string;
    _creator: mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    _comments: mongoose.Schema.Types.ObjectId[];
    commentsCount?: number; // Add this line
}

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    link: { type: String, optional: true },
    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    _comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
});

const Post = mongoose.model<IPost>('Post', PostSchema);
export default Post;
