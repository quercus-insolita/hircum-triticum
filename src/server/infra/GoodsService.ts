import { sortBy } from 'lodash'

import { IncomingGood, OutcomingGood, GoodDataField, InternalGood } from '../domain'
import { InMemoryGoodsRepository } from '../repo/InMemoryGoodsRepository'
import { GoodsRawDataAggregator } from './GoodsRawDataAggregator'
import { createLogger, Logger } from './logger'

type GetAllParams = {
    // TODO: sortOrder: 'asc' | 'desc'
    sortByFields: GoodDataField | GoodDataField[]
    // TODO: includeFields?: GoodDataField | GoodDataField[] | '*'
    // TODO: excludeFields?: GoodDataField | GoodDataField[] | '*'
}

export class GoodsService {
    private readonly logger: Logger = createLogger({
        tenantId: 'goods-service'
    })
    
    constructor(
        private readonly goodsRepository: InMemoryGoodsRepository,
        private readonly goodsAggregator: GoodsRawDataAggregator
    ) {}

    getAll({ sortByFields }: GetAllParams): OutcomingGood[] {
        const allGoodsIncoming = this.goodsRepository.getLatestFlattened()
        const allGoodsInternal = allGoodsIncoming.map(this.transformIncomingGoodToInternal)
        
        const sortByFieldsArray = Array.isArray(sortByFields) ? sortByFields : [sortByFields]
        const allGoodsSorted = sortBy(allGoodsInternal, sortByFieldsArray)

        return allGoodsSorted.map(this.transformInternalGoodToOutcoming)
    }

    async update() {
        this.logger.info('start fetching latest goods from data sources and writing them to repo')
        const goods = await this.goodsAggregator.getGoodsBySources()
        this.logger.info(`received goods from aggregator: ${JSON.stringify(goods)}`)

        // TODO: use repo.bulkCreateAndUpdate()
        Object.entries(goods).forEach(([sourceId, goodsRecord]) => {
            if (goodsRecord.success) {
                this.logger.info(`updating goods for source with sourceId=${sourceId}`)
                this.goodsRepository.createOrUpdate(sourceId, goodsRecord.data)
            } else {
                this.logger.error(goodsRecord.errorMessage)
            }
        })
    }
    
    private transformIncomingGoodToInternal(incomingData: IncomingGood): InternalGood {
        const { price, mass } = incomingData
        const pricePerKg = price / mass

        return {
            ...incomingData,
            pricePerKg
        }
    }

    private transformInternalGoodToOutcoming(internalGood: InternalGood): OutcomingGood {
        const { pricePerKg, ...outcomingGood } = internalGood
        return outcomingGood
    }
}