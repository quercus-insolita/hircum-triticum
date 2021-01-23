export type IncomingGood = {
    price: number
    name: string
    url?: string
    mass?: number
}

export type OutcomingGood = IncomingGood & {
    pricePerKg?: number
}

export type GoodDataField = keyof OutcomingGood