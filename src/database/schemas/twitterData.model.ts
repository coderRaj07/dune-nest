import { HydratedDocument, Schema, model } from 'mongoose';

// TweetData Schema
interface ITweetData {
    author_id: string;
    created_at: string; // ISO date format
    entities: {
        urls?: { url: string; expanded_url: string }[];
    };
    text: string;
    edit_history_tweet_ids?: string[];
    referenced_tweets?: { id: string; type: string }[];
}

export type TweetDataDocument = HydratedDocument<ITweetData>;

export const TweetDataSchema = new Schema<ITweetData>({
    author_id: { type: String, required: true },
    created_at: { type: String, required: true },
    entities: {
        urls: [{ url: String, expanded_url: String }],
    },
    text: { type: String, required: true },
    edit_history_tweet_ids: [String],
    referenced_tweets: [{ id: String, type: String }],
});

// export const TweetDataModel = model<TweetDataDocument>('TweetData', TweetDataSchema);
