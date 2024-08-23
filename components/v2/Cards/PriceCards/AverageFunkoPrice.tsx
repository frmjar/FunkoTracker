import { PriceCard } from "./PriceCard"

export const AverageFunkoPrice = ({ prices }: { prices: Array<{ number: number, currency: string }> }): React.JSX.Element => {
    if (!prices || prices.length === 0) return <></>

    const pricesByCurrency = prices.reduce((acc, price) => {
        if (!price.currency) return acc
        if (!acc[price.currency]) acc[price.currency] = []
        acc[price.currency].push(price.number)
        return acc
    }, {} as Record<string, number[]>)

    const minPriceByCurrency = Object.keys(pricesByCurrency).reduce((acc, currency) => {
        acc[currency] = Math.min(...pricesByCurrency[currency])
        return acc
    }, {} as Record<string, number>)

    const maxPriceByCurrency = Object.keys(pricesByCurrency).reduce((acc, currency) => {
        acc[currency] = Math.max(...pricesByCurrency[currency])
        return acc
    }, {} as Record<string, number>)

    const averagePriceByCurrency = Object.keys(pricesByCurrency).reduce((acc, currency) => {
        acc[currency] = pricesByCurrency[currency].reduce((acc, price) => acc + price, 0) / pricesByCurrency[currency].length
        return acc
    }, {} as Record<string, number>)

    const modaCurrency = prices.reduce((acc, price) => {
        if (!price.currency) return acc
        if (!acc[price.currency]) acc[price.currency] = 0
        acc[price.currency]++
        return acc
    }, {} as Record<string, number>)

    return (
        <div className='flex flex-row md:gap-40 text-center align-middle justify-between md:justify-center mt-0 mb-14'>
            <PriceCard text='Precio mínimo' price={minPriceByCurrency} />
            <PriceCard text='Precio medio' price={averagePriceByCurrency} />
            <PriceCard text='Precio máximo' price={maxPriceByCurrency} />
        </div >
    )
}