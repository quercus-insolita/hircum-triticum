import fetch from 'node-fetch'

import { GOODS_DATA_SOURCE_TIMEOUT } from '../constants'
import { IncomingGood } from '../domain'
import { logger } from '../infra/logger'

type GoodsDataSourceResponse = IncomingGood[]

export class GoodsRawDataAggregator {
    constructor(private readonly sourceUrls: readonly string[]) {}

    async getGoods(): Promise<IncomingGood[]> {
        const responses = await Promise.all(
            this.sourceUrls.map(this.getSourceResponseOrErrorMessage)
        )
        return responses.reduce<GoodsDataSourceResponse>((acc, response) => {
            // filtering out failed requests where the response is error message
            if (typeof response === 'string') {
                logger.error(response)
            } else {
                acc.push(...response)
            }

            return acc
        }, [])
    }

    private async getSourceResponseOrErrorMessage(
        sourceUrl: string
    ): Promise<GoodsDataSourceResponse | string> {
        // TODO: catch timeout failures
        const response = await fetch(sourceUrl, { timeout: GOODS_DATA_SOURCE_TIMEOUT })
        if (response.ok) {
            return response.json()
        }

        const { status, statusText } = response
        const rawResponseText = await response.text()
        return `Request to ${sourceUrl} failed: ${status} ${statusText}. `
            + `Raw response (probably, error message): ${rawResponseText}`
    }
}
