# Dune-Nest-Backend

## Overview

Dune-Nest-Backend is a NestJS-based backend service designed to interact with Dune Analytics, fetching and caching query results for various cryptocurrency narratives and indices. This service ensures efficient data retrieval by leveraging Redis caching and scheduled cache refreshes.

## Features

- **Dune Analytics Integration**: Fetches data from Dune Analytics using predefined query mappings.
- **Caching**: Utilizes Redis to cache query results, reducing redundant external API calls and enhancing performance.
- **Scheduled Cache Refresh**: Implements a cron job to refresh the cache for all queries every 24 hours.
- **Data Compression**: Compresses data before storing it in the cache to optimize storage and retrieval times.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [NestJS CLI](https://docs.nestjs.com/cli/overview)
- [Redis](https://redis.io/) server
- Dune Analytics API Key

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/coderRaj07/dune-nest.git
    cd dune-nest
    ```

2. **Install dependencies**:

    ```bash
    yarn install
    ```

3. **Set up environment variables**:

    Create a `.env` file in the root directory and add your Dune Analytics API key:

    ```env
    DUNE_API_KEY=your_dune_api_key_here
    ```

4. **Start the application**:

    ```bash
    yarn start:dev
    ```

    The server will run by default on `http://localhost:9000`.

### Deployment on Vercel

To avoid deployment issues on Vercel, ensure that all import statements use relative paths. For example:

```typescript
import { OfferDataRepositoryService } from '../database/repositories/offerData.repository.service';
```

Avoid using absolute paths like:

```typescript
import { OfferDataRepositoryService } from 'src/database/repositories/offerData.repository.service';
```

### API Endpoints

The service exposes endpoints to fetch data for various queries. Below is a table of available query endpoints:

Here's the full table with all 42 queries:  

| Query Name                                     | Endpoint URL                                                                                   |  
|-----------------------------------------------|------------------------------------------------------------------------------------------------|  
| Alpha Index (7 days)                           | [https://dune-nest.vercel.app/dune/query/alpha_index_7_d](https://dune-nest.vercel.app/dune/query/alpha_index_7_d) |  
| Beta Index (30 days)                           | [https://dune-nest.vercel.app/dune/query/beta_index_30_d](https://dune-nest.vercel.app/dune/query/beta_index_30_d) |  
| Gamma Index (90 days)                          | [https://dune-nest.vercel.app/dune/query/gamma_index_90_d](https://dune-nest.vercel.app/dune/query/gamma_index_90_d) |  
| Crypto Narrative (24 hours)                    | [https://dune-nest.vercel.app/dune/query/crypto_narrative_24_hr](https://dune-nest.vercel.app/dune/query/crypto_narrative_24_hr) |  
| Crypto Narrative (7 days)                      | [https://dune-nest.vercel.app/dune/query/crypto_narrative_7_d](https://dune-nest.vercel.app/dune/query/crypto_narrative_7_d) |  
| Crypto Narrative (30 days)                     | [https://dune-nest.vercel.app/dune/query/crypto_narrative_30_d](https://dune-nest.vercel.app/dune/query/crypto_narrative_30_d) |  
| Crypto Narrative (90 days)                     | [https://dune-nest.vercel.app/dune/query/crypto_narrative_90_d](https://dune-nest.vercel.app/dune/query/crypto_narrative_90_d) |  
| L1 Narrative (24 hours)                        | [https://dune-nest.vercel.app/dune/query/l1_narrative_24_hr](https://dune-nest.vercel.app/dune/query/l1_narrative_24_hr) |  
| L1 Narrative (7 days)                          | [https://dune-nest.vercel.app/dune/query/l1_narrative_7_d](https://dune-nest.vercel.app/dune/query/l1_narrative_7_d) |  
| L1 Narrative (30 days)                         | [https://dune-nest.vercel.app/dune/query/l1_narrative_30_d](https://dune-nest.vercel.app/dune/query/l1_narrative_30_d) |  
| L1 Narrative (90 days)                         | [https://dune-nest.vercel.app/dune/query/l1_narrative_90_d](https://dune-nest.vercel.app/dune/query/l1_narrative_90_d) |  
| L2/L3 Narrative (24 hours)                     | [https://dune-nest.vercel.app/dune/query/l2_l3_narrative_24_hr](https://dune-nest.vercel.app/dune/query/l2_l3_narrative_24_hr) |  
| L2/L3 Narrative (7 days)                       | [https://dune-nest.vercel.app/dune/query/l2_l3_narrative_7_d](https://dune-nest.vercel.app/dune/query/l2_l3_narrative_7_d) |  
| L2/L3 Narrative (30 days)                      | [https://dune-nest.vercel.app/dune/query/l2_l3_narrative_30_d](https://dune-nest.vercel.app/dune/query/l2_l3_narrative_30_d) |  
| L2/L3 Narrative (90 days)                      | [https://dune-nest.vercel.app/dune/query/l2_l3_narrative_90_d](https://dune-nest.vercel.app/dune/query/l2_l3_narrative_90_d) |  
| Blockchain Service Infra Narrative (24 hours)  | [https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_24_hr](https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_24_hr) |  
| Blockchain Service Infra Narrative (7 days)    | [https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_7_d](https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_7_d) |  
| Blockchain Service Infra Narrative (30 days)   | [https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_30_d](https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_30_d) |  
| Blockchain Service Infra Narrative (90 days)   | [https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_90_d](https://dune-nest.vercel.app/dune/query/blockchain_service_infra_narrative_90_d) |  
| Blue Chip Narrative (24 hours)                 | [https://dune-nest.vercel.app/dune/query/blue_chip_narrative_24_hr](https://dune-nest.vercel.app/dune/query/blue_chip_narrative_24_hr) |  
| Blue Chip Narrative (7 days)                   | [https://dune-nest.vercel.app/dune/query/blue_chip_narrative_7_d](https://dune-nest.vercel.app/dune/query/blue_chip_narrative_7_d) |  
| Blue Chip Narrative (30 days)                  | [https://dune-nest.vercel.app/dune/query/blue_chip_narrative_30_d](https://dune-nest.vercel.app/dune/query/blue_chip_narrative_30_d) |  
| Blue Chip Narrative (90 days)                  | [https://dune-nest.vercel.app/dune/query/blue_chip_narrative_90_d](https://dune-nest.vercel.app/dune/query/blue_chip_narrative_90_d) |  
| DeFi 3.0 Narrative (24 hours)                  | [https://dune-nest.vercel.app/dune/query/defi_3_narrative_24_hr](https://dune-nest.vercel.app/dune/query/defi_3_narrative_24_hr) |  
| DeFi 3.0 Narrative (7 days)                    | [https://dune-nest.vercel.app/dune/query/defi_3_narrative_7_d](https://dune-nest.vercel.app/dune/query/defi_3_narrative_7_d) |  
| DeFi 3.0 Narrative (30 days)                   | [https://dune-nest.vercel.app/dune/query/defi_3_narrative_30_d](https://dune-nest.vercel.app/dune/query/defi_3_narrative_30_d) |  
| DeFi 3.0 Narrative (90 days)                   | [https://dune-nest.vercel.app/dune/query/defi_3_narrative_90_d](https://dune-nest.vercel.app/dune/query/defi_3_narrative_90_d) |  
| Meme Coins Narrative (24 hours)                | [https://dune-nest.vercel.app/dune/query/meme_coins_narrative_24_hr](https://dune-nest.vercel.app/dune/query/meme_coins_narrative_24_hr) |  
| Meme Coins Narrative (7 days)                  | [https://dune-nest.vercel.app/dune/query/meme_coins_narrative_7_d](https://dune-nest.vercel.app/dune/query/meme_coins_narrative_7_d) |  
| Meme Coins Narrative (30 days)                 | [https://dune-nest.vercel.app/dune/query/meme_coins_narrative_30_d](https://dune-nest.vercel.app/dune/query/meme_coins_narrative_30_d) |  
| Meme Coins Narrative (90 days)                 | [https://dune-nest.vercel.app/dune/query/meme_coins_narrative_90_d](https://dune-nest.vercel.app/dune/query/meme_coins_narrative_90_d) |  
| RWA Narrative (24 hours)                       | [https://dune-nest.vercel.app/dune/query/rwa_narrative_24_hr](https://dune-nest.vercel.app/dune/query/rwa_narrative_24_hr) |  
| RWA Narrative (7 days)                         | [https://dune-nest.vercel.app/dune/query/rwa_narrative_7_d](https://dune-nest.vercel.app/dune/query/rwa_narrative_7_d) |  
| RWA Narrative (30 days)                        | [https://dune-nest.vercel.app/dune/query/rwa_narrative_30_d](https://dune-nest.vercel.app/dune/query/rwa_narrative_30_d) |  
| RWA Narrative (90 days)                        | [https://dune-nest.vercel.app/dune/query/rwa_narrative_90_d](https://dune-nest.vercel.app/dune/query/rwa_narrative_90_d) |  
| Web3 Gaming Narrative (24 hours)               | [https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_24_hr](https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_24_hr) |  
| Web3 Gaming Narrative (7 days)                 | [https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_7_d](https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_7_d) |  
| Web3 Gaming Narrative (30 days)                | [https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_30_d](https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_30_d) |  
| Web3 Gaming Narrative (90 days)                | [https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_90_d](https://dune-nest.vercel.app/dune/query/web3_gaming_narrative_90_d) |  
| LST/RST Narrative (24 hours)                   | [https://dune-nest.vercel.app/dune/query/lst_rst_narrative_24_hr](https://dune-nest.vercel.app/dune/query/lst_rst_narrative_24_hr) |  
| LST/RST Narrative (7 days)                     | [https://dune-nest.vercel.app/dune/query/lst_rst_narrative_7_d](https://dune-nest.vercel.app/dune/query/lst_rst_narrative_7_d) |  
| LST/RST Narrative (30 days)                    | [https://dune-nest.vercel.app/dune/query/lst_rst_narrative_30_d](https://dune-nest.vercel.app/dune/query/lst_rst_narrative_30_d) |  
| LST/RST Narrative (90 days)                    | [https://dune-nest.vercel.app/dune/query/lst_rst_narrative_90_d](https://dune-nest.vercel.app/dune/query/lst_rst_narrative_90_d) |  
| Decentralized AI Narrative (24 hours)          | [https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_24_hr](https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_24_hr) |  
| Decentralized AI Narrative (7 days)            | [https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_7_d](https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_7_d) |  
| Decentralized AI Narrative (30 days)           | [https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_30_d](https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_30_d) |  
| Decentralized AI Narrative (90 days)           | [https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_90_d](https://dune-nest.vercel.app/dune/query/decentrlised_ai_narrative_90_d) |  
| DePIN Narrative (24 hours)                     | [https://dune-nest.vercel.app/dune/query/depin_narrative_24_hr](https://dune-nest.vercel.app/dune/query/depin_narrative_24_hr) |  
| DePIN Narrative (7 days)                       | [https://dune-nest.vercel.app/dune/query/depin_narrative_7_d](https://dune-nest.vercel.app/dune/query/depin_narrative_7_d) |  
| DePIN Narrative (30 days)                      | [https://dune-nest.vercel.app/dune/query/depin_narrative_30_d](https://dune-nest.vercel.app/dune/query/depin_narrative_30_d) |  
| DePIN Narrative (90 days)                      | [https://dune-nest.vercel.app/dune/query/depin_narrative_90_d](https://dune-nest.vercel.app/dune/query/depin_narrative_90_d) |   