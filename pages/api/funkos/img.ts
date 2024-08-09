import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { url } = req.query

    if (!url) {
        return res.status(400).json({ error: 'URL is required' })
    }

    try {
        const response = await fetch(url as string)

        if (!response.ok) {
            return res.status(500).json({ error: 'Failed to fetch image' })
        }

        const data = await response.arrayBuffer()

        const contentType = response.headers.get('Content-Type')
        contentType && res.setHeader('Content-Type', contentType)
        res.setHeader('Cache-Control', 's-maxage=86400')

        res.send(Buffer.from(data))
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch image' })
    }
}
