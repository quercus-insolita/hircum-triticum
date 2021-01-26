import express from 'express'

import { router as goodsRouter } from './goods'

const router = express.Router()
router.use('/goods', goodsRouter)

export { router }