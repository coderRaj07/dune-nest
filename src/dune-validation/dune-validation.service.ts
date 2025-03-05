import { Injectable, HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DuneClient } from '@duneanalytics/client-sdk';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DuneValidationService {
  private readonly duneClient: DuneClient;
  private readonly logger = new Logger(DuneValidationService.name);

  private readonly queryMappings: Record<string, number> = {
    'alpha_index_7d': 3804774,
    'beta_index_30_d': 3804861,
    'gamma_index_90_d': 3804881,
    'crypto_narrative_24_hr': 3594639,
    'crypto_narrative_7_d': 3595951,
    'crypto_narrative_30_d': 3600267,
    'crypto_narrative_90_d': 3600193,
    'l1_narrative_24_hr': 3600318,
    'l1_narrative_7_d': 3600515,
    'l1_narrative_30_d': 3600670,
    'l1_narrative_90_d': 3600790,
    'l2_l3_narrative_24_hr': 3600332,
    'l2_l3_narrative_7_d': 3600523,
    'l2_l3_narrative_30_d': 3600697,
    'l2_l3_narrative_90_d': 3600794,
    'blockchain_service_infra_narrative_24_hr': 3600498,
    'blockchain_service_infra_narrative_7_d': 3600629,
    'blockchain_service_infra_narrative_30_d': 3600738,
    'blockchain_service_infra_narrative_90_d': 3600827,
    'blue_chip_narrative_24_hr': 3600482,
    'blue_chip_narrative_7_d': 3600634,
    'blue_chip_narrative_30_d': 3600681,
    'blue_chip_narrative_90_d': 3600792,
    'defi_3_narrative_24_hr': 3600308,
    'defi_3_narrative_7_d': 3600532,
    'defi_3_narrative_30_d': 3600701,
    'defi_3_narrative_90_d': 3600797,
    'meme_coins_narrative_24_hr': 3600340,
    'meme_coins_narrative_7_d': 3600544,
    'meme_coins_narrative_30_d': 3600713,
    'meme_coins_narrative_90_d': 3600800,
    'rwa_narrative_24_hr': 3600385,
    'rwa_narrative_7_d': 3600561,
    'rwa_narrative_30_d': 3600725,
    'rwa_narrative_90_d': 3600808,
    'web3_gaming_narrative_24_hr': 3600375,
    'web3_gaming_narrative_7_d': 3600618,
    'web3_gaming_narrative_30_d': 3600729,
    'web3_gaming_narrative_90_d': 3600818,
    'lst_rst_narrative_24_hr': 3600470,
    'lst_rst_narrative_7_d': 3600639,
    'lst_rst_narrative_30_d': 3600743,
    'lst_rst_narrative_90_d': 3600834,
    'decentrlised_ai_narrative_24_hr': 3600455,
    'decentrlised_ai_narrative_7_d': 3600655,
    'decentrlised_ai_narrative_30_d': 3600763,
    'decentrlised_ai_narrative_90_d': 3600786,
    'depin_narrative_24_hr': 3600461,
    'depin_narrative_7_d': 3600645,
    'depin_narrative_30_d': 3600753,
    'depin_narrative_90_d': 3600841,
    'ai_agent_narrative_24_hr': 4333599,
    'ai_agent_narrative_7_d': 4343559,
    'ai_agent_narrative_30_d': 4343581,
    'ai_agent_narrative_90_d': 3600808,
  };

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    const apiKey = this.configService.get<string>('DUNE_API_KEY');
    if (!apiKey) {
      throw new Error('DUNE_API_KEY is not defined in environment variables');
    }
    this.duneClient = new DuneClient(apiKey);
  }

  /**
   * Fetch query result, first checking Redis cache.
   */
  async getQueryResultByName(queryName: string): Promise<any> {
    this.logger.log(`Fetching query result for: ${queryName}`);
    const queryId = this.queryMappings[queryName.toLowerCase()];
    
    if (!queryId) {
      throw new HttpException('Query name not found', HttpStatus.NOT_FOUND);
    }

    const cacheKey = `dune_query_${queryId}`;
    
    // 1️⃣ Try fetching from Redis
    const cachedData = await this.cacheManager.get(cacheKey);
    if (cachedData) {
      this.logger.log(`Cache hit for ${queryName}`);
      return cachedData;
    }

    // 2️⃣ Fetch from Dune if cache miss
    const result = await this.getQueryResult(queryId);
    
    // 3️⃣ Store result in Redis
    await this.cacheManager.set(cacheKey, result);
    
    return result;
  }

  /**
   * Fetch query result from Dune
   */
  async getQueryResult(queryId: number): Promise<any> {
    try {
      return (await this.duneClient.getLatestResult({ queryId })).result.rows;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch Dune query result: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * Refresh cache for all queries every 24 hours using a cron job
   */

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async refreshCache() {
    this.logger.log('Refreshing Dune query cache...');

    await Promise.all(
      Object.entries(this.queryMappings).map(async ([queryName, queryId]) => {
        try {
          const result = await this.getQueryResult(queryId);
          const cacheEntry = { data: result, updatedAt: Date.now() };
          await this.cacheManager.set(`dune_query_${queryId}`, cacheEntry);
          this.logger.log(`Cache updated for: ${queryName}`);
        } catch (error) {
          this.logger.error(`Failed to refresh cache for ${queryName}: ${error.message}`);
        }
      })
    );
  }

}
