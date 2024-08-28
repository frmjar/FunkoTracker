import { VintedItem } from 'const/VintedAPIInterface'
import Puppeteer from './Puppeteer'

export class VintedAPI {

    static search = async (query: string): Promise<VintedItem[]> => {
        await Puppeteer.init()
        const coockie = await Puppeteer.getCookiesVinted()
        const results = await Puppeteer.getAPIVinted(query, coockie)
        return results
    }
}