import { PriceCard } from "./PriceCard"

export const AverageFunkoPrice = ({ prices }: { prices: Array<{ number: number, currency: string }> }): React.JSX.Element => {
    if (!prices || prices.length === 0) return <></>

    const averagePrice = prices.reduce((acc, price) => acc + price.number, 0) / prices.length
    const minPrice = Math.min(...prices.map(price => price.number))
    const maxPrice = Math.max(...prices.map(price => price.number))

    const modaCurrency = prices.reduce((acc, price) => {
        if (!price.currency) return acc
        if (!acc[price.currency]) acc[price.currency] = 0
        acc[price.currency]++
        return acc
    }, {} as Record<string, number>)

    const currency = Object.keys(modaCurrency).reduce((acc, currency) => modaCurrency[currency] > modaCurrency[acc] ? currency : acc, Object.keys(modaCurrency)[0])

    return (
        <div className='flex flex-row md:gap-40 text-center align-middle justify-between md:justify-center mt-0 mb-14'>
            <PriceCard text='Precio mínimo' price={minPrice} currency={currency} />
            <PriceCard text='Precio medio' price={averagePrice} currency={currency} />
            <PriceCard text='Precio máximo' price={maxPrice} currency={currency} />
        </div >
    )
}