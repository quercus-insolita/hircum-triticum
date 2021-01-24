import express from 'express'

import { GoodDataField } from '../domain'

// TODO: `string` in lieu of `GoodDataField`, add validation and then convert to `GoodDataField`
type ListAllRequestQueryParams = {
    offset?: string
    limit?: string
    sortBy?: GoodDataField | GoodDataField[]
    // TODO: sortOrder?: 'asc' | 'desc'
    // TODO: includeFields?: GoodDataField | GoodDataField[] | '*'
    // TODO: excludeFields?: GoodDataField | GoodDataField[] | '*'
}

const router = express.Router()
router.get<
    never, any, never, ListAllRequestQueryParams
>('/listAll', async (req, res) => {
    const { sortBy: sortByFields = 'pricePerKg' } = req.query
    // TODO: add validation for query params
    const offset = Number(req.query.offset || '0')
    const limit = req.query.limit ? Number(req.query.limit) : null 

    const allGoods = await req.goodsService.getAll({ sortByFields })
    const response = limit === null
        ? allGoods.slice(offset)
        : allGoods.slice(offset, offset + limit)

    res.status(200).json(response)
})

export { router }