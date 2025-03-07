import { Model } from 'mongoose';
import { GenericQueryService } from '../repositories/_genericQuery.repository.service';
import {
    OfferDataDocument
} from '../schemas/offerData.model';

export class OfferDataRepositoryService extends GenericQueryService<OfferDataDocument> {
    constructor(model: Model<OfferDataDocument>) {
        super(model);
    }
}