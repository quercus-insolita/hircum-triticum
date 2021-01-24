export type IncomingGood = {
    price: number
    name: string
    url: string
    mass: number
    imageUrl: string
}

export type OutcomingGood = IncomingGood & {
    pricePerKg: number
}

export type GoodDataField = keyof OutcomingGood