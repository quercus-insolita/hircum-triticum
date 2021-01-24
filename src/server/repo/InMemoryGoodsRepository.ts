import { InternalGood } from '../domain'

type SourceRecord = {
    readonly lastUpdate: Date
    readonly goods: InternalGood[]
}

export class InMemoryGoodsRepository {
    private readonly goodsBySourceDict: Record<string, SourceRecord> = {}
    private lastUpdate: Date | null = null // the last time this.createOrUpdate or this.bulkCreateOrUpdate was called

    getLatest(): Record<string, InternalGood[]>
    getLatest(sourceId: string): InternalGood[]
    getLatest(sourceId?: string): InternalGood[] | Record<string, InternalGood[]> {
        if (sourceId !== undefined) {
            return this.goodsBySourceDict[sourceId].goods
        }

        return Object.entries(this.goodsBySourceDict).reduce<
            Record<string, InternalGood[]>
        >((acc, [key, value]) => {
            acc[key] = value.goods
            return acc
        }, {})
    }

    createOrUpdate(sourceId: string, goods: InternalGood[]): Date {
        this.goodsBySourceDict[sourceId] = {
            goods,
            lastUpdate: new Date()
        }

        this.lastUpdate = this.goodsBySourceDict[sourceId].lastUpdate
        return this.lastUpdate
    }

    bulkCreateOrUpdate(data: Record<string, InternalGood[]>): Date {
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
