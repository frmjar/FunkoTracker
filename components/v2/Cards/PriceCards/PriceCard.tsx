import { formatNumberAsString } from "const"

export const PriceCard = ({ text, price }: { text: string, price: number }): React.JSX.Element => {
    return (
        <div className='flex flex-col shadow-box rounded-box p-4'>
            <span> {text} </span >
            <span>{formatNumberAsString(price)}</span>
        </div >
    )
}