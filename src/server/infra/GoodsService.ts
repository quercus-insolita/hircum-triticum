import { sortBy } from 'lodash';

import { IncomingGoodData, OutcomingGoodData, GoodDataField } from '../domain';
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
        const allGoodsRaw = await this.rawDataAggregator.getGoodsData()
        const allGoodsTransformed = allGoodsRaw.map(this.transformIncomingGoodDataToOutcoming)
        
        const sortByFieldsArray = Array.isArray(sortByFields) ? sortByFields : [sortByFields]
        return sortBy(allGoodsTransformed, sortByFieldsArray)
    }

    private transformIncomingGoodDataToOutcoming(incomingData: IncomingGoodData): OutcomingGoodData {
        const { price, mass } = incomingData
        const pricePerKg = mass ? price / mass : null

        return {
            ...incomingData,
            ...(pricePerKg === null ? {} : { pricePerKg })
        }
    }
}