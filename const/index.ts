export const IMG_DEFAULT_URL = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg'

export const currencies = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    AUD: 'A$',
    CAD: 'C$',
    CHF: 'CHF',
    CNY: 'CN¥',
    SEK: 'kr',
    NZD: 'NZ$',
    MXN: 'MX$',
    SGD: 'S$',
    HKD: 'HK$',
    NOK: 'kr',
    KRW: '₩',
    TRY: '₺',
    RUB: '₽',
    INR: '₹',
    BRL: 'R$',
    ZAR: 'R',
    IDR: 'Rp',
    MYR: 'RM',
    PHP: '₱',
    PLN: 'zł',
    ILS: '₪',
    DKK: 'kr',
    THB: '฿',
    HUF: 'Ft',
    CZK: 'Kč',
    CLP: 'CLP$',
    AED: 'AED',
    COP: 'COL$',
    SAR: 'SR',
    ARS: 'AR$',
    VND: '₫',
    IQD: 'IQD',
    QAR: 'QR',
    CRC: '₡',
    NGN: '₦',
    UAH: '₴',
    PKR: '₨',
    EGP: 'EGP',
    KES: 'Ksh',
    KWD: 'KD',
    DZD: 'DA',
    UYU: '$U',
    BYN: 'Br',
    LBP: 'L£',
    TND: 'DT',
    RSD: 'din',
    MAD: 'MAD',
    UZS: 'UZS'
}

export const currenciesMap = (currency?: keyof typeof currencies): string => {
    if (!currency) return ''
    return currencies[currency] || currency
}

export const formatNumberAsString = (number?: number | string): string | undefined => {
    if (!number) return undefined
    return parseFloat(number.toString().replace(',', '.')).toFixed(2).replace('.', ',')
}

export const extractNumberAndCurrency = (price?: string): RegExpMatchArray | undefined => {
    if (!price) return undefined
    return price?.match(/(\d+[,.]?\d*)?\s?(.+)?/i) || undefined
}

export const extractNumber = (price?: string): number | undefined => {
    if (!price) return undefined
    const number = extractNumberAndCurrency(price)?.[1]
    return number ? parseFloat(number.replace(',', '.')) : undefined
}

export const formatPrice = (price?: string): string | undefined => {
    if (!price) return undefined

    const priceAndcurrency = extractNumberAndCurrency(price)
    const priceFormatted = formatNumberAsString(priceAndcurrency?.[1])
    const priceFormatted2 = `${priceFormatted} ${priceAndcurrency?.[2]}`.replace(/undefined/g, '')

    return priceFormatted2
}