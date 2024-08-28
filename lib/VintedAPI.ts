import axios from 'axios'
import { VintedItem } from 'const/VintedAPIInterface'
import UserAgent from 'user-agents'
import Puppeteer from './Puppeteer'

export class VintedAPI {

    static search = async (query: string): Promise<VintedItem[]> => {
        await Puppeteer.init()
        const coockie = await Puppeteer.getCookiesVinted()

        const results = axios.get(`https://www.vinted.es/api/v2/catalog/items?search_text=funko+${query}`, {
            headers: {
                cookie: `_vinted_fr_session=${coockie}`,
                'user-agent': new UserAgent().toString(),
                accept: 'application/json, text/plain, */*'
            }
        }).then((res): VintedItem[] => {
            return res.data.items
        }).catch((e): never[] => {
            console.log(e.message)
            return []
        })

        return results
    }
}