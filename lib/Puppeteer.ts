import chromium from '@sparticuz/chromium'
import { FunkoProps } from 'const/interfaces'
import { VintedItem } from 'const/VintedAPIInterface'
import { Browser, Page } from 'puppeteer'
import puppeteer from 'puppeteer-extra'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'

puppeteer.use(StealthPlugin())

export default class Puppeteer {
  private static browser: Browser | null = null;

  static async init(): Promise<void> {
    if (Puppeteer.browser) return

    try {
      Puppeteer.browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        headless: chromium.headless,
      })

      console.log('Navegador inicializado')
    } catch (error) {
      console.error('Failed to initialize Puppeteer:', error)
      throw error
    }

  }

  static async close(): Promise<void> {
    if (!Puppeteer.browser) throw new Error('Browser not initialized')

    try {
      await Puppeteer.browser.close()
      Puppeteer.browser = null
      console.log('Navegador cerrado')
    } catch (error) {
      console.error('Failed to close browser:', error)
      throw error
    }
  }

  static async getCookiesVinted(): Promise<string> {
    if (!Puppeteer.browser) throw new Error('Browser not initialized')

    try {
      const page = await Puppeteer.browser.newPage()
      await page.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Priority': 'u=0, i',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      })

      // Habilita o deshabilita JavaScript
      await page.setJavaScriptEnabled(true)

      await page.goto('https://www.vinted.es', { waitUntil: ['domcontentloaded', 'networkidle0'] })

      const cookies = await page?.cookies()
      const cookie = cookies?.find(c => c.name === '_vinted_fr_session')?.value

      await page?.close()

      return cookie ?? ''
    } catch (error) {
      console.error('Failed to get Vinted cookies:', error)
      throw error
    }
  }

  static async getAPIVinted(query: string, coockie: string): Promise<VintedItem[]> {

    // call to Vinted API using puppeteer

    try {
      const page = await Puppeteer.browser?.newPage()
      await page?.setExtraHTTPHeaders({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:129.0) Gecko/20100101 Firefox/129.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Priority': 'u=0, i',
        'Pragma': 'no-cache',
        'Cache-Control': 'no-cache'
      })

      await page?.setCookie({
        name: '_vinted_fr_session',
        value: coockie,
        domain: '.www.vinted.es'
      })

      await page?.goto(`https://www.vinted.es/api/v2/catalog/items?search_text=funko+${query}`, { waitUntil: 'domcontentloaded' })

      const jsonData = await page?.evaluate(() => {
        const preElement = document.querySelector('pre')
        if (preElement) {
          return JSON.parse(preElement.textContent!)
        }
        return null
      })

      await page?.close()

      return jsonData.items ?? []

    } catch (error) {
      console.error('Failed to get API Vinted:', error)
      throw error
    }
  }

  static async newPage(search: string): Promise<Page> {
    if (!Puppeteer.browser) throw new Error('Browser not initialized')

    console.info(`Buscando Funko de ${search}...`)

    const page = await Puppeteer.browser.newPage()
    await page.goto(`https://www.google.com/search?q=funko+${search}+-site:.fr&gl=es&lr=lang_es`, { waitUntil: 'domcontentloaded' })
    return page
  }

  static async evaluatePatrocinadosSuperior(page: Page): Promise<FunkoProps[]> {
    try {
      return await page.evaluate((): FunkoProps[] => {
        const funkos: FunkoProps[] = []

        document.querySelectorAll('.pla-unit').forEach(funko => {
          const web = funko.getAttribute('data-dtld') ?? undefined
          const image = funko.querySelector('.pla-unit-container .pla-unit-img-container img')?.getAttribute('src') ?? undefined
          const imageAlt = funko.querySelector('.pla-unit-container .pla-unit-img-container img')?.getAttribute('alt') ?? undefined
          const link = funko.querySelector('.pla-unit-container a.pla-unit-img-container-link')?.getAttribute('href') ?? undefined
          const name = (funko.querySelector('.pla-unit-container .pla-unit-title span') as HTMLElement)?.innerText
          const price = funko.querySelector('.pla-unit-container .pla-unit-title')?.nextElementSibling?.querySelector('span')?.innerText
          const shipping = (funko.querySelector('.pla-unit-container .pla-extensions-container > div') as HTMLElement)?.innerText
          const stars = funko.querySelector('.pla-unit-container .pla-extensions-container > div')?.nextElementSibling?.querySelector('span > span')?.getAttribute('aria-label')?.replace(/,\s*$/, '')
          const reviews = (funko.querySelector('.pla-unit-container .pla-extensions-container > div')?.nextElementSibling?.querySelector('span')?.nextElementSibling as HTMLElement)?.innerText?.replace(/\(|\)/g, '')

          funkos.push({ web, image, imageAlt, link, name, price, shipping, stars, reviews, debug: 'Patrocinados Superior' })
        })

        return funkos
      })
    } catch (error) {
      console.error('Failed to evaluate Patrocinados Superior:', error)
      throw error
    }
  }

  static async evaluatePatrocinadosLateral(page: Page): Promise<FunkoProps[]> {
    try {
      return await page.evaluate((): FunkoProps[] => {
        const funkos: FunkoProps[] = []

        document.querySelectorAll('div[data-attrid="kc:/shopping/gpc:organic-offers"] div[role="listitem"]').forEach(funko => {
          const funkoBox = funko.querySelectorAll('a')[0]
          const textos = funkoBox.innerText.split('\n')
          const indexNameNormal = !!textos[2]?.toLowerCase().includes('funko') || !!textos[2]?.toLowerCase().includes('pop')

          const web = textos[0]
          const link = funkoBox.getAttribute('href') ?? undefined
          const name = indexNameNormal ? textos[2] : textos[3]
          const price = textos[1]
          const shipping = indexNameNormal ? textos[4] : undefined

          funkos.push({ web, link, name, price, shipping, debug: 'Patrocinados Lateral' })
        })

        return funkos
      })
    } catch (error) {
      console.error('Failed to evaluate Patrocinados Lateral:', error)
      throw error
    }
  }

  static async evaluatePrincipal(page: Page): Promise<FunkoProps[]> {
    try {
      return await page.evaluate((): FunkoProps[] => {
        const funkos: FunkoProps[] = []

        document.querySelectorAll('div[data-async-context] > div').forEach(funko => {
          const web = funko.querySelectorAll('div.notranslate span') ? (funko.querySelectorAll('div.notranslate span')[1] as HTMLElement)?.innerText : undefined
          let image = funko.querySelector('.kb0PBd.cvP2Ce.LnCrMe')?.querySelector('img')?.getAttribute('src') ?? undefined
          image = image === 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' ? undefined : image

          const link = funko.querySelector('a')?.getAttribute('href') ?? undefined
          const name = funko.querySelector('h3')?.innerText ?? ''
          const priceAndStock = (funko.querySelector('div.ChPIuf') as HTMLElement)?.innerText

          const valoracionRegex = /((.+):(\s)(\d+)[,.]?\d*)/i
          const resenasRegex = /([\d.,]+)(\s+)([\wñ]{3,})/i
          const precioRegex = /((\d+[,.]\d+)(\s+)([\w]{1,3}|[^·\D\W]|[^·]))/i
          const stockRegex = /[^·]*stock[^·]*/i

          const stars = priceAndStock?.match(valoracionRegex)?.[0].trim()
          const reviews = priceAndStock?.match(resenasRegex)?.[0].trim()
          const price = priceAndStock?.match(precioRegex)?.[0].trim()
          const stock = priceAndStock?.match(stockRegex)?.[0].trim()


          funkos.push({ web, image, link, name, price, stock, stars, reviews, debug: 'Principal' })
        })

        return funkos
      })
    } catch (error) {
      console.error('Failed to evaluate Principal:', error)
      throw error
    }
  }

  static async closePage(page: Page): Promise<void> {
    try {
      await page.close()
    } catch (error) {
      console.error('Failed to close page:', error)
      throw error
    }
  }
}
