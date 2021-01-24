import { InternalGood } from '../domain'

export class InMemoryGoodsRepository {
    private readonly goodsDictionary: Record<string, InternalGood> = {}

    getLatest() {}

    createOrUpdate() {}

    getLastUpdateTimestamp() {}
}
