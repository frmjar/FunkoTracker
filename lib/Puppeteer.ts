'use client'

import { FunkoProps } from 'const/interfaces'
import puppeteer, { Browser, BrowserContext, Page } from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export default class Puppeteer {
  private browser: Browser | null
  private context: BrowserContext | null
  private client: any
  private latitude?: string
  private longitude?: string

  constructor(latitude?: string, longitude?: string) {
    this.browser = null
    this.context = null
    this.client = null
  }

  async init(): Promise<void> {
    try {
      this.browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      })
    } catch (error) {
      console.error('Failed to initialize Puppeteer:', error)
      throw error
    }
  }

  async close(): Promise<void> {
    if (!this.browser) throw new Error('Browser not initialized')

    try {
      await this.browser.close()
    } catch (error) {
      console.error('Failed to close browser:', error)
      throw error
    }
  }

  async newPage(search: string): Promise<Page> {
    if (!this.browser) throw new Error('Browser not initialized')

    const page = await this.browser.newPage()
    await page.goto(`https://www.google.com/search?q=funko+${search}+-site:.fr&gl=es&lr=lang_es`, { waitUntil: 'domcontentloaded' })
    return page
  }

  async evaluatePatrocinadosSuperior(page: Page): Promise<FunkoProps[]> {
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

  async evaluatePatrocinadosLateral(page: Page): Promise<FunkoProps[]> {
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

  async evaluatePrincipal(page: Page): Promise<FunkoProps[]> {
    try {
      return await page.evaluate((): FunkoProps[] => {
        const funkos: FunkoProps[] = []

        document.querySelectorAll('div[data-async-context] > div').forEach(funko => {
          const web = funko.querySelectorAll('div.notranslate span') ? (funko.querySelectorAll('div.notranslate span')[1] as HTMLElement)?.innerText : undefined
          let image = funko.querySelectorAll('a img') ? funko.querySelectorAll('a img')[1]?.getAttribute('src') ?? undefined : undefined
          image = image === 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==' ? undefined : image

          const link = funko.querySelector('a')?.getAttribute('href') ?? undefined
          const name = funko.querySelector('h3')?.innerText ?? ''
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

  async closePage(page: Page): Promise<void> {
    try {
      await page.close()
    } catch (error) {
      console.error('Failed to close page:', error)
      throw error
    }
  }
}
