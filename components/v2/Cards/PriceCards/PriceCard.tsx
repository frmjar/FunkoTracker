import { formatNumberAsString } from "const"

export const PriceCard = ({ text, price, currency }: { text: string, price: number, currency: string }): React.JSX.Element => {
    return (
        <div className='flex flex-col shadow-box rounded-box p-4'>
            <span> {text} </span >
            <span>{formatNumberAsString(price)} {currency}</span>
        </div >
    )
}