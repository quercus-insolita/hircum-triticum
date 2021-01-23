import { GoodsRawDataAggregator } from './infra/GoodsRawDataAggregator'
import { GoodsService } from './infra/GoodsService'
import { GOODS_DATA_SOURCE_URLS } from './constants'

export type AppContext = {
    goodsService: GoodsService
}

export const createAppContext = (): AppContext => {
    const aggregator = new GoodsRawDataAggregator(GOODS_DATA_SOURCE_URLS)
    return {
        goodsService: new GoodsService(aggregator)
    }
}