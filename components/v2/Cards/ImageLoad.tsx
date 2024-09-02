import Image from 'next/image'
import { useState } from "react"

interface ImageLoadProps {
    src?: string
    alt: string
    fallbackSrc: string
}

export default function ImageLoad({ src, alt, fallbackSrc }: ImageLoadProps) {
    const [source] = useState(src || fallbackSrc)
    const [error, setError] = useState(false)

    if (error) {
        return (
            <img src={source} alt={alt} height={200} width={170} style={{ minWidth: '170px', width: 'auto', height: 200 }} />
        )
    }

    return (
        <Image
            src={`/api/funkos/img?url=${encodeURIComponent(source)}`}
            alt={alt}
            height={200}
            width={170}
            style={{ minWidth: '170px', width: 'auto', height: 200 }}
            onError={() => {
                setError(true)
            }}
        />
    )
}