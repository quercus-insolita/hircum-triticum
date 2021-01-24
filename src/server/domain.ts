export type IncomingGood = {
    price: number
    name: string
    url: string
    mass: number
    imageUrl: string
}

export type InternalGood = IncomingGood & {
    pricePerKg: number
}
export type GoodDataField = keyof InternalGood

export type OutcomingGood = IncomingGood
