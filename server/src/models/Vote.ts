        // src/models/Vote.ts
        import mongoose, { Schema, Document } from 'mongoose';

        interface IVote extends Document {
            userId: mongoose.Schema.Types.ObjectId;
            postId?: mongoose.Schema.Types.ObjectId;
            commentId?: mongoose.Schema.Types.ObjectId;
            voteType: 'upvote' | 'downvote';
        }

        const voteSchema = new Schema<IVote>({
            userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            postId: { type: Schema.Types.ObjectId, ref: 'Post' },
            commentId: { type: Schema.Types.ObjectId, ref: 'Comment' },
            voteType: { type: String, enum: ['upvote', 'downvote'], required: true }
        }, {
            timestamps: true
        });

        // Pre-save validation
        voteSchema.pre('save', function(next) {
            // `this` refers to the document being saved
            if (this.postId && this.commentId) {
                next(new Error('Cannot vote on both a post and a comment at the same time.'));
            } else if (!this.postId && !this.commentId) {
                next(new Error('Must vote on either a post or a comment.'));
            } else {
                next();
            }
        });

        const Vote = mongoose.model<IVote>('Vote', voteSchema);

        export default Vote;
