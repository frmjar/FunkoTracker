import { FunkoProps } from 'const/interfaces'

let puppeteer: any
let chromium: any
let Browser: any
let Page: any

async function loadDependencies() {
  if (process.env.NODE_ENV === "development") {
    puppeteer = await import('puppeteer')
    Browser = (await import('puppeteer')).Browser
    Page = (await import('puppeteer')).Page
  } else {
    puppeteer = await import('puppeteer-core')
    Browser = (await import('puppeteer-core')).Browser
    Page = (await import('puppeteer-core')).Page
    chromium = await import('@sparticuz/chromium')
  }
}

export default class Puppeteer {
  private static browser: typeof Browser | null = null;

  static async init(): Promise<void> {
    if (Puppeteer.browser) return

    await loadDependencies()

    try {
      if (process.env.NODE_ENV === "development") {
        Puppeteer.browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
          defaultViewport: null
        })
      }
      else {
        Puppeteer.browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: chromium.defaultViewport,
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
        })
      }

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

  static async newPage(search: string): Promise<typeof Page> {
    if (!Puppeteer.browser) throw new Error('Browser not initialized')

    const page = await Puppeteer.browser.newPage()
    await page.goto(`https://www.google.com/search?q=funko+${search}+-site:.fr&gl=es&lr=lang_es`, { waitUntil: 'domcontentloaded' })
    return page
  }

  static async evaluatePatrocinadosSuperior(page: typeof Page): Promise<FunkoProps[]> {
    try {
      return await page.evaluate((): FunkoProps[] => {
        const funkos: FunkoProps[] = []

        document.querySelectorAll('.pla-unit').forEach(funko => {
          const web = funko.getAttribute('data-dtld') ?? undefined
          const image = funko.querySelector('.pla-unit-container .pla-unit-img-container img')?.getAttribute('src') ?? undefined
          const link = funko.querySelector('.pla-unit-container a.pla-unit-img-container-link')?.getAttribute('href') ?? undefined
          const name = (funko.querySelector('.pla-unit-container .pla-unit-title span') as HTMLElement)?.innerText
          const price = funko.querySelector('.pla-unit-container .pla-unit-title')?.nextElementSibling?.querySelector('span')?.innerText
          const shipping = (funko.querySelector('.pla-unit-container .pla-extensions-container > div') as HTMLElement)?.innerText
          const stars = funko.querySelector('.pla-unit-container .pla-extensions-container > div')?.nextElementSibling?.querySelector('span > span')?.getAttribute('aria-label')?.replace(/,\s*$/, '')
          const reviews = (funko.querySelector('.pla-unit-container .pla-extensions-container > div')?.nextElementSibling?.querySelector('span')?.nextElementSibling as HTMLElement)?.innerText?.replace(/\(|\)/g, '')

          funkos.push({ web, image, link, name, price, shipping, stars, reviews })
        })

        return funkos
      })
    } catch (error) {
      console.error('Failed to evaluate Patrocinados Superior:', error)
      throw error
    }
  }

  static async evaluatePatrocinadosLateral(page: typeof Page): Promise<FunkoProps[]> {
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

          funkos.push({ web, link, name, price, shipping })
        })

        return funkos
      })
    } catch (error) {
      console.error('Failed to evaluate Patrocinados Lateral:', error)
      throw error
    }
  }

  static async evaluatePrincipal(page: typeof Page): Promise<FunkoProps[]> {
    try {
      return await page.evaluate((): FunkoProps[] => {
        const funkos: FunkoProps[] = []

        document.querySelectorAll('div[data-async-context] > div').forEach(funko => {
          const web = (funko.querySelector('div.notranslate span:nth-child(2)') as HTMLElement)?.innerText
          let image = funko.querySelector('a img:nth-child(2)')?.getAttribute('src') ?? undefined
          image = image === 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' ? undefined : image

          const link = funko.querySelector('a')?.getAttribute('href') ?? undefined
          const name = funko.querySelector('h3')?.innerText || ''
          const price = (funko.querySelector('div.ChPIuf > span') as HTMLElement)?.innerText

          funkos.push({ web, image, link, name, price })
        })

        return funkos
      })
    } catch (error) {
      console.error('Failed to evaluate Principal:', error)
      throw error
    }
  }


  static async closePage(page: typeof Page): Promise<void> {
    try {
      await page.close()
    } catch (error) {
      console.error('Failed to close page:', error)
      throw error
    }
  }
}
