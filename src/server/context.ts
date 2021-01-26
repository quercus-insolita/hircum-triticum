import { GoodsRawDataAggregator } from './infra/GoodsRawDataAggregator'
import { GoodsService } from './infra/GoodsService'
import { GOODS_DATA_SOURCE_URLS } from './constants'
import { InMemoryGoodsRepository } from './repo/InMemoryGoodsRepository'

export type AppContext = {
    goodsService: GoodsService
}

export const createAppContext = (repository: InMemoryGoodsRepository): AppContext => {
    const goodsAggregator = new GoodsRawDataAggregator(GOODS_DATA_SOURCE_URLS)
    return {
        goodsService: new GoodsService(repository, goodsAggregator)
    }
}