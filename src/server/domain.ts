export type IncomingGoodData = {
    price: number
    name: string
    url?: string
    mass?: number
}

export type OutcomingGoodData = IncomingGoodData & {
    pricePerKg?: number
}

export type GoodDataField = keyof OutcomingGoodData