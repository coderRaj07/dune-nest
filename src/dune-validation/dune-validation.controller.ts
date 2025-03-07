import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DuneValidationService } from './dune-validation.service';

@Controller('dune')
export class DuneValidationController {
  constructor(private readonly duneService: DuneValidationService) { }

  @Get('query/:queryName')
  async getQueryResult(@Param('queryName') queryName: string) {
    return this.duneService.getQueryResultByName(queryName);
  }
}