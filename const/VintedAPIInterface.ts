export interface VintedInterface {
    items: VintedItem[]
    dominant_brand: any
    search_tracking_params: SearchTrackingParams2
    pagination: Pagination
    code: number
}

export interface VintedItem {
    id: number
    title: string
    price: string
    is_visible: boolean
    discount: any
    currency: string
    brand_title: string
    user: User
    url: string
    promoted: boolean
    photo: Photo2
    favourite_count: number
    is_favourite: boolean
    badge: any
    conversion: any
    service_fee: string
    total_item_price: string
    view_count: number
    size_title: string
    content_source: string
    status: string
    icon_badges: any[]
    search_tracking_params: SearchTrackingParams
}

interface User {
    id: number
    login: string
    profile_url: string
    photo?: Photo
    business: boolean
}

export interface Photo {
    id: number
    width: number
    height: number
    temp_uuid: any
    url: string
    dominant_color: string
    dominant_color_opaque: string
    thumbnails: Thumbnail[]
    is_suspicious: boolean
    orientation: any
    high_resolution: HighResolution
    full_size_url: string
    is_hidden: boolean
    extra: Extra
}

interface Thumbnail {
    type: string
    url: string
    width: number
    height: number
    original_size: any
}

interface HighResolution {
    id: string
    timestamp: number
    orientation: any
}

interface Extra { }

export interface Photo2 {
    id: number
    image_no: number
    width: number
    height: number
    dominant_color: string
    dominant_color_opaque: string
    url: string
    is_main: boolean
    thumbnails: Thumbnail2[]
    high_resolution: HighResolution2
    is_suspicious: boolean
    full_size_url: string
    is_hidden: boolean
    extra: Extra2
}

interface Thumbnail2 {
    type: string
    url: string
    width: number
    height: number
    original_size?: boolean
}

interface HighResolution2 {
    id: string
    timestamp: number
    orientation?: number
}

interface Extra2 { }

interface SearchTrackingParams {
    score: number
    matched_queries: any[]
}

interface SearchTrackingParams2 {
    search_correlation_id: string
    search_session_id: string
    global_search_session_id: string
}

interface Pagination {
    current_page: number
    total_pages: number
    total_entries: number
    per_page: number
    time: number
}
