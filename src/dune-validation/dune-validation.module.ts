import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DuneValidationController } from './dune-validation.controller';
import { DuneValidationService } from './dune-validation.service';
import { OfferDataRepositoryService } from '../database/repositories/offerData.repository.service';

@Module({
  imports: [HttpModule],
  controllers: [DuneValidationController],
  providers: [DuneValidationService, OfferDataRepositoryService], //HttpService is never provided here, it inheritly comes from HttpModule
})
export class DuneValidationModule { }