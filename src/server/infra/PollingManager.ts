import { POLLING_INTERVAL } from '../constants';
import { InMemoryGoodsRepository } from '../repo/InMemoryGoodsRepository';
import { GoodsRawDataAggregator } from './GoodsRawDataAggregator';

export class PollingManager {
    constructor(
        private readonly goodsRepository: InMemoryGoodsRepository,
        private readonly goodsAggregator: GoodsRawDataAggregator
    ) {}

    start() {
        setTimeout(() => {}, POLLING_INTERVAL)
    }

    updateGoodsIfStale() {
        const lastUpdate = this.goodsRepository.getLastUpdateTimestamp()
        if (lastUpdate === null || Date.now() - lastUpdate.getTime()) {
            const 
        }
    }
}