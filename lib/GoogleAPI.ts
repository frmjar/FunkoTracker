import axios from "axios"
import { GoogleAPIDataInterface } from "const/GoogleAPIInterface"

export class GoogleAPI {
    static async search(query: string): Promise<GoogleAPIDataInterface | undefined> {
        try {
            const response1 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?start=11&cx=9625fbdec74e34747&q=${query}&cr=countryES&lr=lang_es&filter=1&exactTerms=funko&gl=es&hl=es&key=${process.env.GOOGLE_API_KEY}`)
            const response2 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?start=21&cx=9625fbdec74e34747&q=${query}&cr=countryES&lr=lang_es&filter=1&exactTerms=funko&gl=es&hl=es&key=${process.env.GOOGLE_API_KEY}`)
            const response3 = await axios.get(`https://content-customsearch.googleapis.com/customsearch/v1?start=31&cx=9625fbdec74e34747&q=${query}&cr=countryES&lr=lang_es&filter=1&exactTerms=funko&gl=es&hl=es&key=${process.env.GOOGLE_API_KEY}`)

            return {
                items: [
                    ...response1.data.items,
                    ...response2.data.items,
                    ...response3.data.items
                ]
            }
        } catch (error: any) {
            console.error('Failed to search:', error.response.data)
            throw error.response.data
        }
    }
}