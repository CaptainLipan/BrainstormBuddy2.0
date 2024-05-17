import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
    text: string;
    isDeleted: boolean;
    createdAt: Date;
    _creator: mongoose.Schema.Types.ObjectId;  // Reference to User document
    _post: mongoose.Schema.Types.ObjectId;     // Reference to Post document
}

const commentSchema = new Schema<IComment>({
    text: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    _creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    _post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

// Pre-find hook to populate _creator and _post
commentSchema.pre('find', function(next) {
    this.populate('_creator', 'username createdAt -_id')
        .populate('_post', 'title createdAt -_id');
    next();
});

const Comment = mongoose.model<IComment>('Comment', commentSchema);
export default Comment;
