import express from 'express'

import { GoodDataField, OutcomingGood } from '../domain'
import { createLogger, Logger } from '../infra/logger'

// TODO: `string` in lieu of `GoodDataField`, add validation and then convert to `GoodDataField`
type ListAllRequestQueryParams = {
    forceUpdate?: any
    offset?: string
    limit?: string
    sortBy?: GoodDataField | GoodDataField[]
    // TODO: sortOrder?: 'asc' | 'desc'
    // TODO: includeFields?: GoodDataField | GoodDataField[] | '*'
    // TODO: excludeFields?: GoodDataField | GoodDataField[] | '*'
}

const logger: Logger = createLogger({
    tenantId: '/goods router'
})
const router = express.Router()
router.use((req, _res, next) => {
    logger.info('received request', { url: req.originalUrl })
    next()
})

router.get<
    never, OutcomingGood[], never, ListAllRequestQueryParams
>('/listAll', async (req, res) => {
    const { forceUpdate, sortBy: sortByFields = 'pricePerKg' } = req.query
    // TODO: add validation for query params
    const offset = Number(req.query.offset || '0')
    const limit = req.query.limit ? Number(req.query.limit) : null

    if (forceUpdate !== undefined) {
        await req.goodsService.update()
    }

    const allGoods = req.goodsService.getAll({ sortByFields })
    const response = limit === null
        ? allGoods.slice(offset)
        : allGoods.slice(offset, offset + limit)

    res.status(200).json(response)
})

export { router }