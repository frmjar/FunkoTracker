import { PriceCard } from "./PriceCard"

export const AverageFunkoPrice = ({ prices }: { prices: number[] }): React.JSX.Element => {
    if (!prices || prices.length === 0) return <></>

    const averagePrice = prices.reduce((acc: number, price: number) => acc + price, 0) / prices.length
    const maxPrice = Math.max(...prices)
    const minPrice = Math.min(...prices)

    return (
        <div className='flex flex-row md:gap-40 text-center align-middle justify-between md:justify-center mt-0 mb-14'>
            <PriceCard text='Precio mínimo' price={minPrice} />
            <PriceCard text='Precio medio' price={averagePrice} />
            <PriceCard text='Precio máximo' price={maxPrice} />
        </div >
    )
}