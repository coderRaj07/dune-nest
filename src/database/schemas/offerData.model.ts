import { HydratedDocument, Schema, model } from 'mongoose';

export interface IOfferData {
  salt: string;
  creator_twitter_id: string;
  required_likes: number;
  requirements: string;
  post_id: string; // ID of the tweet being validated
}

export type OfferDataDocument = HydratedDocument<IOfferData>;

export const OfferDataSchema = new Schema<IOfferData>({
  salt: { type: String, required: true },
  creator_twitter_id: { type: String, required: true },
  required_likes: { type: Number, required: true },
  requirements: { type: String, required: true },
  post_id: { type: String, required: true },
});

// export const OfferDataModel = model<OfferDataDocument>('OfferData', OfferDataSchema);