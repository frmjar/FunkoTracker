import Image from 'next/image'
import { useState } from "react"

interface ImageLoadProps {
    src?: string
    alt: string
    fallbackSrc: string
}

export default function ImageLoad({ src, alt, fallbackSrc }: ImageLoadProps) {
    const [source, setSource] = useState(src || fallbackSrc)
    const [error, setError] = useState(false)

    return (
        <Image
            src={`/api/funkos/img?url=${encodeURIComponent(source)}`}
            alt={alt}
            height={200}
            width={170}
            style={{ minWidth: '170px', width: 'auto', height: 200 }}
            unoptimized={error}
            onError={() => {
                setSource(fallbackSrc)
                setError(true)
            }}
        />
    )
}