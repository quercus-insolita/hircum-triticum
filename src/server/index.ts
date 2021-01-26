import { createExpressApp } from './express'
import { APP_PORT } from './constants'
import { logger } from './infra/logger'
import { InMemoryGoodsRepository } from './repo/InMemoryGoodsRepository'
import { createAppContext } from './context'
import { PollingManager } from './infra/PollingManager'

const goodsRepository = new InMemoryGoodsRepository()

const { goodsService } = createAppContext(goodsRepository)
const pollingManager =  new PollingManager(goodsService, goodsRepository)
pollingManager.startPolling()

const app = createExpressApp(goodsRepository)

app.listen(APP_PORT, () => {
    logger.info(`Server is listening on ${APP_PORT}`)
})