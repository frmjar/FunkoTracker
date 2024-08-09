export interface FunkoProps {
    name: string
    image?: string
    link?: string
    web?: string
    price?: string
    shipping?: string
    stars?: string
    reviews?: string
}

export interface FunkoResponseProps {
    values: FunkoProps[]
    discarted: FunkoProps[]
}

export interface FunkoResponseErrorProps {
    error: string
}