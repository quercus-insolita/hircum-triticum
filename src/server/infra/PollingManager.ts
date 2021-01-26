import { POLLING_DELTA, POLLING_INTERVAL } from '../constants';
import { InMemoryGoodsRepository } from '../repo/InMemoryGoodsRepository';
import { GoodsService } from './GoodsService';
import { createLogger, Logger } from './logger';

export class PollingManager {
    private readonly logger: Logger = createLogger({
        tenantId: 'polling-manager'
    })
    
    constructor(
        private readonly goodsService: GoodsService,
        private readonly goodsRepository: InMemoryGoodsRepository,
    ) {}

    startPolling() {
        this.logger.info('start polling')
        this.scheduleStaleGoodsUpdates()
    }

    private async scheduleStaleGoodsUpdates() {
        const lastUpdate = this.goodsRepository.getLastUpdateTimestamp()
        let milisFromLastUpdate = lastUpdate === null
            ? +Infinity
            : Date.now() - lastUpdate.getTime()

        // Node's setTimout is not very precise,
        // so if milisFromLastUpdate is too close to POLLING_INTERVAL - let's update
        // https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_args
        if (milisFromLastUpdate >= POLLING_INTERVAL
            || POLLING_INTERVAL - milisFromLastUpdate <= POLLING_DELTA) {
            if (lastUpdate === null) {
                this.logger.info('no update was performed before')
            } else {
                this.logger.info(
                    `scheduled update is necessary: ${milisFromLastUpdate}ms passed `
                    + `from last update (the exact time was ${lastUpdate?.toISOString()})`
                )
            }

            await this.goodsService.update()

            this.logger.info(`scheduling next update with ${POLLING_INTERVAL}ms timeout`)
            setTimeout(() => this.scheduleStaleGoodsUpdates(), POLLING_INTERVAL)
        } else {
            this.logger.info(
                `scheduled update is not necessary: only ${milisFromLastUpdate}ms passed `
                + `from last update (the exact time was ${lastUpdate?.toISOString()})`
            )

            this.logger.info(`setting next update with ${POLLING_INTERVAL - milisFromLastUpdate}ms timeout`)
            setTimeout(() => this.scheduleStaleGoodsUpdates(), POLLING_INTERVAL - milisFromLastUpdate)
        }
    }
}