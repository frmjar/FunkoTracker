import { FunkoProps, FunkoResponseErrorProps, FunkoResponseProps } from 'const/interfaces'
import Puppeteer from 'lib/Puppeteer'
import { NextApiRequest, NextApiResponse } from 'next'

const organiceFunkos = (search: string, funkosList: FunkoProps[], funkosValues: Map<string, FunkoProps>, funkosDescartados: Map<string, FunkoProps>): void => {
  funkosList.forEach(f => {
    if (f.web?.toLowerCase().includes('idealo') || f.web?.toLowerCase().includes('globerada')) return

    if (search.toLowerCase().split(' ').some(s => f.name?.toLowerCase().includes(s.toLowerCase()))) {
      funkosValues.set(f.name, f)
    } else {
      funkosDescartados.set(f.name, f)
    }
  })
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<FunkoResponseProps | FunkoResponseErrorProps>): Promise<void> {
  const browser = new Puppeteer()
  await browser.init()

  const { search } = req.query
  const funkosValues = new Map<string, FunkoProps>()
  const funkosDescartados = new Map<string, FunkoProps>()

  try {
    if (search === undefined || search.length < 3 || search === '') throw new Error('Search is required')

    await Promise.all(Array(5).fill(undefined).map(async (): Promise<void> => {
      const page = await browser.newPage(search as string)

      const funkoLists = await Promise.all([
        browser.evaluatePatrocinadosSuperior(page),
        browser.evaluatePatrocinadosLateral(page),
        browser.evaluatePrincipal(page)
      ])

      await browser.closePage(page)

      funkoLists.forEach(funkoList => organiceFunkos(search as string, funkoList, funkosValues, funkosDescartados))
    }))
  } catch (error) {
    console.error('Error en la ejecución principal:', error)
    res.status(500).json({ error: 'Error en la ejecución principal' })
  } finally {
    await browser.close()
  }

  res.status(200).json({ values: Array.from(funkosValues.values()), discarted: Array.from(funkosDescartados.values()) })
}
