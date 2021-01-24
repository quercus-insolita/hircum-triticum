import { sortBy } from 'lodash';

import { IncomingGood, OutcomingGood, GoodDataField, InternalGood } from '../domain';
import { GoodsRawDataAggregator } from './GoodsRawDataAggregator';

type GetAllParams = {
    // TODO: sortOrder: 'asc' | 'desc'
    sortByFields: GoodDataField | GoodDataField[]
    // TODO: includeFields?: GoodDataField | GoodDataField[] | '*'
    // TODO: excludeFields?: GoodDataField | GoodDataField[] | '*'
}

export class GoodsService {
    constructor(private rawDataAggregator: GoodsRawDataAggregator) {}

    async getAll({ sortByFields }: GetAllParams): Promise<OutcomingGood[]> {
        const allGoodsIncoming = await this.rawDataAggregator.getGoods()
        const allGoodsInternal = allGoodsIncoming.map(this.transformIncomingGoodToInternal)
        
        const sortByFieldsArray = Array.isArray(sortByFields) ? sortByFields : [sortByFields]
        const allGoodsSorted = sortBy(allGoodsInternal, sortByFieldsArray)

        return allGoodsSorted.map(this.transformInternalGoodToOutcoming)
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