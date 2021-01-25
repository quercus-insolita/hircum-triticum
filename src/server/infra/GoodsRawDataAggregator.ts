import fetch from 'node-fetch'
import type { Response as FetchResponse } from 'node-fetch'

import { GOODS_DATA_SOURCE_TIMEOUT } from '../constants'
import { IncomingGood } from '../domain'
import { createLogger, Logger } from '../infra/logger'

type GoodsDataSourceSuccessResponse = IncomingGood[]

type GoodsBySourceRecord = {
    success: true,
    data: IncomingGood[]
} | {
    success: false,
    errorMessage: string
}
type GetGoodsBySourceReturnType = Record<string, GoodsBySourceRecord>

export class GoodsRawDataAggregator {
    private readonly logger: Logger = createLogger({
        tenantId: 'goods-raw-data-aggregator'
    })
    
    constructor(private readonly sourceUrls: readonly string[]) {}
    
    async getGoodsBySources(): Promise<GetGoodsBySourceReturnType> {
        const responses = await Promise.all(
            this.sourceUrls.map(this.getSourceResponseOrErrorMessage)
        )
        return responses.reduce<GetGoodsBySourceReturnType>((acc, response, index) => {
            let currentSourceGoodsRecord: GoodsBySourceRecord
            if (typeof response === 'string') {
                currentSourceGoodsRecord = {
                    success: false,
                    errorMessage: response
                }
            } else {
                currentSourceGoodsRecord = {
                    success: true,
                    data: response
                }
            }

            acc[this.sourceUrls[index]] = currentSourceGoodsRecord
            return acc
        }, {})
    }

    private async getSourceResponseOrErrorMessage(
        sourceUrl: string
    ): Promise<GoodsDataSourceSuccessResponse | string> {
        let response: FetchResponse
        let errorMessage: string

        try {
            response = await fetch(sourceUrl, { timeout: GOODS_DATA_SOURCE_TIMEOUT })
            if (response.ok) {
                return response.json()
            }

            const { status, statusText } = response
            const rawResponseText = await response.text()

            errorMessage = `Goods data source under ${sourceUrl} responded with ${status} ${statusText}. `
                + `Raw response (probably, error message): ${rawResponseText}`
        } catch (error) {
            errorMessage = `Request to goods data source under ${sourceUrl} failed. `
                + `Original error: ${error}`
        }

        return errorMessage
    }
}
