import axios from 'axios'
import { VintedItem } from 'const/VintedAPIInterface'
import UserAgent from 'user-agents'

export class VintedAPI {

    static search = async (query: string): Promise<VintedItem[]> => {
        const coockie = await axios.get(`https://www.vinted.es`).then((res): string => {
            const sessionCookie = res?.headers?.['set-cookie'] ?? ''
            const cc = sessionCookie[1].split(`_vinted_fr_session=`)[1].split(';')[0]
            return cc
        }).catch((e): null => {
            console.log(e)
            return null
        })

        const results = axios.get(`https://www.vinted.es/api/v2/catalog/items?search_text=funko+${query}`, {
            headers: {
                cookie: `_vinted_fr_session=${coockie}`,
                'user-agent': new UserAgent().toString(),
                accept: 'application/json, text/plain, */*'
            }
        }).then((res): VintedItem[] => {
            return res.data.items
        }).catch((e): never[] => {
            console.log(e)
            return []
        })

        return results
    }
}