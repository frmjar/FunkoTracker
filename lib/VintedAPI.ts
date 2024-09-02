import { VintedItem } from 'const/VintedAPIInterface'
import HCCrawler from 'headless-chrome-crawler'
import Puppeteer from './Puppeteer'

export class VintedAPI {

    static search = async (query: string): Promise<VintedItem[]> => {
        await Puppeteer.init()
        const coockie = await Puppeteer.getCookiesVinted()
        const results = await Puppeteer.getAPIVinted(query, coockie)
        return results
    }

    static searchNuevo = async (query: string): Promise<VintedItem[]> => {

        let coockies, funkos: VintedItem[] = []

        const crawler = await HCCrawler.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            maxConcurrency: 1,
            onSuccess: (result: any) => {
                coockies = result.cookies
            }
        })

        await crawler.queue({
            url: `https://www.vinted.es`,
            maxDepth: 1,
            allowedDomains: ['www.vinted.es'],
            maxRequests: 1
        })

        await crawler.onIdle()
        await crawler.close()

        const crawler2 = await HCCrawler.launch({
            maxConcurrency: 1,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            evaluatePage: () => {
                const preElement = document.querySelector('pre')
                if (preElement) {
                    return JSON.parse(preElement.textContent!)
                }
                return null
            },
            onSuccess: (result: any) => {
                funkos = result.result.items
            }
        })

        await crawler2.queue({
            url: `https://www.vinted.es/api/v2/catalog/items?search_text=funko+${query}`,
            maxDepth: 1,
            allowedDomains: ['www.vinted.es'],
            maxRequests: 1,
            cookies: coockies
        })


        await crawler2.onIdle()
        await crawler2.close()

        return funkos
    }
}