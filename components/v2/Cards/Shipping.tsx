import { formatPrice } from "const"

interface ShippingProps {
    web?: string
    value?: string
    currency: string
}

export const Shipping = ({ web, value, currency }: ShippingProps): React.JSX.Element => {
    if (!value) return <></>

    return (
        <span className='font-normal text-sm mr-4 leading-7'>
            {web === 'Vinted' ? `Gastos extra: ${formatPrice(value)} ${currency}` : `${value}`}
        </span>
    )

}