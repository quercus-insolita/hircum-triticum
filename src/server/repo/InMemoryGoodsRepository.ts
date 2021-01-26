import { IncomingGood } from '../domain'
import { createLogger, Logger } from '../infra/logger'

type SourceRecord<TGood> = {
    readonly lastUpdate: Date
    readonly goods: TGood[]
}

export class InMemoryGoodsRepository<TGood extends IncomingGood = IncomingGood> {
    private readonly logger: Logger = createLogger({
        tenantId: 'polling-manager'
    })
    private readonly goodsBySourceDict: Record<string, SourceRecord<TGood>> = {}
    private lastUpdate: Date | null = null // the last time this.createOrUpdate or this.bulkCreateOrUpdate was called

    getLatestFlattened(): TGood[] {
        return Object.values(this.goodsBySourceDict)
            .reduce<TGood[]>(
                (acc, { goods }) => [...acc, ...goods],
                []
            )
            .filter(({ title }) => !title.toLowerCase().includes('борошно'))
    }

    getLatest(): Record<string, TGood[]>
    getLatest(sourceId: string): TGood[]
    getLatest(sourceId?: string): TGood[] | Record<string, TGood[]> {
        if (sourceId !== undefined) {
            return this.goodsBySourceDict[sourceId].goods
        }

        return Object.entries(this.goodsBySourceDict).reduce<Record<string, TGood[]>>(
            (acc, [sourceId, { goods }]) => ({
                ...acc,
                [sourceId]: goods
            }),
            {}
        )
    }

    createOrUpdate(sourceId: string, goods: TGood[]): Date {
        this.goodsBySourceDict[sourceId] = {
            goods,
            lastUpdate: new Date()
        }

        this.lastUpdate = this.goodsBySourceDict[sourceId].lastUpdate
        return this.lastUpdate
    }

    bulkCreateOrUpdate(data: Record<string, TGood[]>): Date {
        const currentTime = new Date()
        Object.entries(data).forEach(([sourceId, goods]) => {
            this.goodsBySourceDict[sourceId] = {
                goods,
                lastUpdate: new Date(currentTime)
            }
        })

        this.lastUpdate = currentTime
        return this.lastUpdate
    }

    getLastUpdateTimestamp(): Date | null
    getLastUpdateTimestamp(sourceId: string): Date
    getLastUpdateTimestamp(sourceId?: string): Date | null {
        if (sourceId !== undefined) {
            return this.goodsBySourceDict[sourceId].lastUpdate
        }
        return this.lastUpdate
    }
}
