import { app } from './app'
import { APP_PORT } from './constants'
import { logger } from './infra/logger'

app.listen(APP_PORT, () => {
    logger.info(`Server is listening on ${APP_PORT}`)
})