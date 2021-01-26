export type IncomingGood = {
    price: number
    title: string
    url: string
    mass: number
    imageUrl: string
}

export type InternalGood = IncomingGood & {
    pricePerKg: number
}
export type GoodDataField = keyof InternalGood

export type OutcomingGood = Pick<IncomingGood, keyof IncomingGood> // cloning to distinguish
