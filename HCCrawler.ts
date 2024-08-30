declare module 'headless-chrome-crawler' {
    export interface CrawlerOptions {
        maxConcurrency?: number
        args?: string[]
        timeout?: number
        retryCount?: number
        retryDelay?: number
        retryId?: number
        evaluatePage?: any
        onSuccess?: any
        onError?: any
        preRequest?: any
        maxDepth?: number
    }

    class HCCrawler {
        static launch(options: CrawlerOptions): Promise<HCCrawler>
        queue(url: string | { url: string; maxDepth?: number; allowedDomains?: string[]; maxRequests?: number; cookies?: any[] }): Promise<void>
        onIdle(): Promise<void>
        close(): Promise<void>

    }

    export default HCCrawler
}
