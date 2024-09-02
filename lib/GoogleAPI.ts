import axios from "axios"
import { GoogleAPIDataInterface } from "const/GoogleAPIInterface"
//import { items as items1 } from "mockups/data1.json"
//import { items as items2 } from "mockups/data2.json"
//import { items as items3 } from "mockups/data3.json"

export class GoogleAPI {
    static async search(query: string): Promise<GoogleAPIDataInterface | undefined> {

        try {
            const response1 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?cx=9625fbdec74e34747&q=funko+${query}&highRange=99999&lowRange=1&cr=countryES&filter=1&exactTerms=funko&gl=es&hl=es&key=${process.env.GOOGLE_API_KEY}`)
            const response2 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?start=11&cx=9625fbdec74e34747&q=funko+${query}&highRange=99999&lowRange=1&cr=countryES&lr=lang_es&filter=1&exactTerms=funko&gl=es&hl=es&key=${process.env.GOOGLE_API_KEY}`)
            // const response3 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?start=21&cx=9625fbdec74e34747&q=${query}&cr=countryES&lr=lang_es&filter=1&exactTerms=funko&gl=es&hl=es&key=${process.env.GOOGLE_API_KEY}`)
            const response4 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?cx=9625fbdec74e34747&q=funko+${query}&orTerms=${query}&highRange=99999&lowRange=1&siteSearch=vinted.es&siteSearchFilter=i&key=${process.env.GOOGLE_API_KEY}`)
            //const response5 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?cx=9625fbdec74e34747&q=funko+${query}&orTerms=${query}&highRange=99999&lowRange=1&siteSearch=es.wallapop.com&siteSearchFilter=i&key=${process.env.GOOGLE_API_KEY}`)

            return {
                items: [
                    ...response1.data.items,
                    ...response4.data.items,
                    //...response5.data.items
                    ...response2.data.items,
                    //  ...response3.data.items
                ]
                //@ts-ignore
                //items: [
                //    ...items1,
                //    ...items2,
                //     ...items3
                // ]
            }
        } catch (error: any) {
            console.error('Failed to search:', error.response.data)
            throw error.response.data
        }
    }
}