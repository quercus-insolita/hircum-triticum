import { sortBy } from 'lodash';

import { IncomingGood, OutcomingGood, GoodDataField } from '../domain';
import { GoodsRawDataAggregator } from './GoodsRawDataAggregator';

type GetAllParams = {
    // TODO: sortOrder: 'asc' | 'desc'
    sortByFields?: GoodDataField | GoodDataField[]
    // TODO: includeFields?: GoodDataField | GoodDataField[] | '*'
    // TODO: excludeFields?: GoodDataField | GoodDataField[] | '*'
}

export class GoodsService {
    constructor(private rawDataAggregator: GoodsRawDataAggregator) {}

    async getAll({ sortByFields = 'pricePerKg' }: GetAllParams) {
        const allGoodsRaw = await this.rawDataAggregator.getGoods()
        const allGoodsTransformed = allGoodsRaw.map(this.transformIncomingGoodDataToOutcoming)
        
        const sortByFieldsArray = Array.isArray(sortByFields) ? sortByFields : [sortByFields]
        return sortBy(allGoodsTransformed, sortByFieldsArray)
    }

    private transformIncomingGoodDataToOutcoming(incomingData: IncomingGood): OutcomingGood {
        const { price, mass } = incomingData
        const pricePerKg = mass ? price / mass : null

        return {
            ...incomingData,
            ...(pricePerKg === null ? {} : { pricePerKg })
        }
    }
}