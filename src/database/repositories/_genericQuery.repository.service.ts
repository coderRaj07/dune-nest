import { Document, HydratedDocument, LeanDocument, Model } from "mongoose";

export class GenericQueryService<T extends Document> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async createEntity(data: any): Promise<T> {
    return await this.model.create(data);
  }

  async readEntity(
    identifier: object,
    options: object = {},
    displayFields: object = {},
  ): Promise<T> {
    if (await this.checkValidity(identifier)) {
      return this.model
        .findOne(
          identifier,
          {
            createdOn: 0,
            updatedOn: 0,
            ...displayFields,
          },
          options,
        )
        .lean();
    }

  }

  async updateEntity(identifier: object, data: object): Promise<boolean> {
    if (await this.checkValidity(identifier)) {
      await this.model.findOneAndUpdate(identifier, data);
      return Promise.resolve(true);
    }
  }

  async updateMultipleEntities(identifier: object, data: object): Promise<boolean> {
    if (await this.checkValidity(identifier)) {
      await this.model.updateMany(identifier, data);
      return Promise.resolve(true);
    }
  }

  async updateAndReturnEntity(identifier: object, data: object): Promise<any> {
    if (await this.checkValidity(identifier)) {
      const updatedDocument = await this.model.findOneAndUpdate(identifier, data, {
        new: true,
      });
      return updatedDocument;
    }
  }

  async deleteEntity(identifier: object): Promise<boolean> {
    if (await this.checkValidity(identifier)) {
      await this.model.findByIdAndDelete(identifier);
      return Promise.resolve(true);
    }
  }

  async checkValidity(identifier: object): Promise<boolean> {
    const exists = await this.model.exists(identifier);
    if (!exists) return Promise.resolve(false);
    return Promise.resolve(true);
  }

  async readMultipleEntities(
    identifier: object,
    options: object = {},
    displayFields: object = {},
  ): Promise<LeanDocument<HydratedDocument<T>>[]> {
    const data = await this.model
      .find(
        identifier,
        {
          createdOn: 0,
          updatedOn: 0,
          ...displayFields,
        },
        options,
      )
      .lean()
      .exec();
    return data;
  }
}
