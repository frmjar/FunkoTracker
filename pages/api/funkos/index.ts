import { formatPrice } from 'const'
import { GoogleAPIDataInterface } from 'const/GoogleAPIInterface'
import { FunkoProps, FunkoResponseErrorProps, FunkoResponseProps } from 'const/interfaces'
import { GoogleAPI } from 'lib/GoogleAPI'
import Puppeteer from 'lib/Puppeteer'
import { VintedAPI } from 'lib/VintedAPI'
import { NextApiRequest, NextApiResponse } from 'next'

const clearFunkos = (search: string, funkosList: FunkoProps[]): FunkoProps[] => {
  const funkosValues = new Map<string, FunkoProps>()

  funkosList.forEach(f => {
    if (f.web?.toLowerCase().includes('idealo') || f.web?.toLowerCase().includes('globerada')) return
    if (search.toLowerCase().split(' ').some(s => f.name?.toLowerCase().includes(s.toLowerCase()))) {
      f.price = formatPrice(f.price)
      funkosValues.set(f.name, f)
    }
  })

  return Array.from(funkosValues.values())
}

const searchGoogle = async (search: string): Promise<FunkoProps[]> => {

  let results: GoogleAPIDataInterface | undefined = undefined

  try {
    results = await GoogleAPI.search(search as string)
  } catch (error: any) {
    return []
  }

  if (results === undefined) return []

  const resultsFiltered = results.items.filter(f => {
    if (!f.pagemap) return false
    return f.pagemap.metatags[0]['product:price:amount'] !== undefined
  })

  const values = resultsFiltered.map(f => {
    return {
      name: f.title,
      image: f.pagemap.metatags[0]['og:image'],
      imageAlt: f.pagemap.metatags[0]['og:image:alt'],
      link: f.link,
      web: f.displayLink,
      price: f.pagemap.metatags[0]['product:price:amount'],
      currency: f.pagemap.metatags[0]['product:price:currency'],
      stock: f.pagemap.metatags[0]['product:availability'],
      debug: 'googleAPI'
    }
  })

  return values
}

const searchVinted = async (search: string): Promise<FunkoProps[]> => {
  const results = await VintedAPI.search(search as string)

  return results.map(f => {
    return {
      name: f.title,
      image: f.photo.url,
      imageAlt: f.title,
      link: f.url,
      web: 'Vinted',
      price: f.price,
      shipping: f.service_fee,
      currency: f.currency,
      stock: f.status,
      debug: 'Vinted'
    }
  })
}

const searchPuppetter = async (search: string): Promise<FunkoProps[]> => {
  await Puppeteer.init()

  const page = await Puppeteer.newPage(search as string)

  const funkoLists = await Promise.all([
    Puppeteer.evaluatePatrocinadosSuperior(page),
    Puppeteer.evaluatePatrocinadosLateral(page),
    Puppeteer.evaluatePrincipal(page)
  ])

  await Puppeteer.closePage(page)

  return funkoLists.flat()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<FunkoResponseProps | FunkoResponseErrorProps>): Promise<void> {
  const { search } = req.query

  let funkosList: FunkoProps[] = []

  try {
    if (search === undefined || search.length < 3 || search === '') throw new Error('Search is required')



    const results = await searchGoogle(search as string)
    results.push(...await searchVinted(search as string))
    results.push(...await searchPuppetter(search as string))

    funkosList = clearFunkos(search as string, results)

  } catch (error: any) {
    console.error('Error en la ejecución principal:', error)
    res.status(500).json({ error: 'Error en la ejecución principal' })
  }

  // order by price
  const values = funkosList.sort((a, b) => {
    const priceA = Number.parseFloat(a.price?.replace(/€/g, '').replace(/,/g, '.') ?? ' 0')
    const priceB = Number.parseFloat(b.price?.replace(/€/g, '').replace(/,/g, '.') ?? ' 0')

    return priceA - priceB
  })

  res.status(200).json({ values })
}
