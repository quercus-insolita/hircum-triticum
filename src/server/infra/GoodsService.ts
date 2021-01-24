import { sortBy } from 'lodash';

import { IncomingGood, OutcomingGood, GoodDataField, InternalGood } from '../domain';
import { GoodsRawDataAggregator } from './GoodsRawDataAggregator';

type GetAllParams = {
    // TODO: sortOrder: 'asc' | 'desc'
    sortByFields?: GoodDataField | GoodDataField[]
    // TODO: includeFields?: GoodDataField | GoodDataField[] | '*'
    // TODO: excludeFields?: GoodDataField | GoodDataField[] | '*'
}

export class GoodsService {
    constructor(private rawDataAggregator: GoodsRawDataAggregator) {}

    async getAll({ sortByFields = 'pricePerKg' }: GetAllParams): Promise<OutcomingGood[]> {
        const allGoodsRaw = await this.rawDataAggregator.getGoods()
        const allGoodsTransformed = allGoodsRaw.map(this.transformIncomingGoodToInternal)
        
        const sortByFieldsArray = Array.isArray(sortByFields) ? sortByFields : [sortByFields]
        return sortBy(allGoodsTransformed, sortByFieldsArray)
    }

    private transformIncomingGoodToInternal(incomingData: IncomingGood): InternalGood {
        const { price, mass } = incomingData
        const pricePerKg = price / mass

        return {
            ...incomingData,
            pricePerKg
        }
    }
}