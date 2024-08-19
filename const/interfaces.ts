export interface FunkoProps {
    name: string
    image?: string
    imageAlt?: string
    link?: string
    web?: string
    price?: string
    currency?: string
    shipping?: string
    stars?: string
    reviews?: string
    stock?: string
    debug?: string
}

export interface FunkoResponseProps {
    values: FunkoProps[]
    discarted?: FunkoProps[]
}

export interface FunkoResponseErrorProps {
    error: string
}