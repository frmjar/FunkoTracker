import { formatNumberAsString } from "const"

export const PriceCard = ({ text, price }: { text: string, price: Record<string, number> }): React.JSX.Element => {
    return (
        <div className='flex flex-col shadow-box rounded-box p-4'>
            <span> {text} </span >
            {
                Object.entries(price).map(([currency, price]) => (
                    <span key={currency}>{formatNumberAsString(price)} {currency}</span>
                ))
            }
        </div >
    )
}