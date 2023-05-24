import Joi from 'joi';
import mongoose, { ObjectId } from 'mongoose';

export interface IPost extends mongoose.Document {
    content: string;
    user: ObjectId,
    facebook_status: number,
    linkedin_status: number,
    meta: {
        facebook: any,
        linkedin: any
    },
    createdAt?: Date,
    updatedAt?: Date
}

export enum SocialStatus {
    NOT_POSTED = 0,
    POSTED = 1,
    ERROR_POSTED = 2,
    CRAWLING = 3,
    ERROR_CRAWLING = 4,
    SUCCESS = 5
}

const PostSchema = new mongoose.Schema<IPost>({
    content: { type: String, required: true },
    facebook_status: { type: Number, default: 0, enum: [0, 1, 2, 3, 4] },
    linkedin_status: { type: Number, default: 0, enum: [0, 1, 2, 3, 4] },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    meta: {
        type: mongoose.Schema.Types.Mixed,
        default: {
            facebook: {},
            linkedin: {}
        }
    }
}, { timestamps: true });

export const qualityPost = Joi.object({
    content: Joi.string().required(),
    authData: Joi.object(),
});

export default mongoose.model<IPost>('Post', PostSchema);

