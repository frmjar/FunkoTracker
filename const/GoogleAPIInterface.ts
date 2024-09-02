export interface GoogleAPIDataInterface {
    items: Item[]
}

export interface Item {
    kind: string
    title: string
    htmlTitle: string
    link: string
    displayLink: string
    snippet: string
    htmlSnippet: string
    formattedUrl: string
    htmlFormattedUrl: string
    pagemap: Pagemap
}

export interface Pagemap {
    cse_thumbnail: CseThumbnail[]
    metatags: Metatag[]
    cse_image: CseImage[]
    offer?: Offer[]
    product?: Product[]
    hproduct?: Hproduct[]
    listitem?: Listitem[]
    organization?: Organization[]
}

export interface CseThumbnail {
    src: string
    width: string
    height: string
}

export interface Metatag {
    "og:image": string
    "og:type"?: string
    "twitter:card"?: string
    "twitter:title"?: string
    "og:site_name"?: string
    "twitter:url"?: string
    "og:title": string
    "twitter:label1"?: string
    "twitter:label2"?: string
    "nuvempay-logo"?: string
    "og:description"?: string
    "og:image:secure_url"?: string
    "twitter:data1"?: string
    "twitter:image:src"?: string
    "twitter:data2"?: string
    "tiendanube:price"?: string
    "tiendanube:stock"?: string
    viewport: string
    "og:url": string
    "og:image:width"?: string
    author?: string
    "og:image:height"?: string
    publisher?: string
    "msapplication-config"?: string
    "og:image:alt"?: string
    "og:price:amount"?: string
    "og:price:currency"?: string
    "product:weight:units"?: string
    "product:price:amount"?: string
    "product:pretax_price:amount"?: string
    "product:price:currency"?: string
    "product:pretax_price:currency"?: string
    "product:weight:value"?: string
    "og:image:type"?: string
    "product:availability"?: string
    "msapplication-tileimage"?: string
    "twitter:image"?: string
    "og:updated_time"?: string
    "product:brand"?: string
    "twitter:description"?: string
    "og:locale"?: string
    "product:retailer_item_id"?: string
    "theme-color"?: string
    title?: string
    "encrypted-slate-token"?: string
    "msapplication-navbutton-color"?: string
    "facebook-domain-verification"?: string
}

export interface CseImage {
    src: string
}

export interface Offer {
    pricecurrency: string
    price: string
    availability?: string
    url?: string
}

export interface Product {
    image?: string
    gtin13?: string
    "swiper-lazy"?: string
    name: string
    description?: string
    sku?: string
    url?: string
}

export interface Hproduct {
    fn: string
    description?: string
    photo?: string
    currency: string
    currency_iso4217: string
    url?: string
}

export interface Listitem {
    item?: string
    name: string
    position: string
}

export interface Organization {
    sameas: string
}
