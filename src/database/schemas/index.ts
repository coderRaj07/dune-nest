import { ModelDefinition } from "@nestjs/mongoose";
import { TweetDataSchema } from "./twitterData.model";
import { OfferDataSchema } from "./offerData.model";

export const modelDefs: Array<ModelDefinition> = 
[
    { name: 'TweetData', schema: TweetDataSchema },
    { name: 'OfferData', schema: OfferDataSchema }
]
