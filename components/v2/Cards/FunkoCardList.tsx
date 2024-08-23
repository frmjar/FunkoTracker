import { extractNumberAndCurrency } from 'const'
import { FunkoProps } from 'const/interfaces'
import { Fragment } from 'react'
import { useRecoilValueLoadable } from 'recoil'
import { funkoListQuery } from 'selectors'
import { FunkoItemCard } from './FunkoItemCard'
import { AverageFunkoPrice } from './PriceCards/AverageFunkoPrice'

export default function FunkoList() {
  const funkoListLoadable = useRecoilValueLoadable(funkoListQuery)

  switch (funkoListLoadable.state) {
    case 'hasValue':
      const prices = funkoListLoadable.contents
        .data?.values?.map((funko: FunkoProps): { number: number, currency: string } | undefined => extractNumberAndCurrency(funko.price))
        .filter((value): boolean => value !== undefined) as Array<{ number: number, currency: string }>

      return (
        <Fragment>
          <AverageFunkoPrice prices={prices} />
          <div className='flex flex-wrap justify-center gap-4'>
            {funkoListLoadable.contents.data?.values?.map((funko: FunkoProps) => (
              <FunkoItemCard key={funko.name} funko={funko} />
            ))}
          </div>
        </Fragment>
      )
    case 'loading':
      return (
        <div className='flex items-center justify-center'>
          <span className='loading loading-bars loading-lg'></span>
        </div>
      )
    case 'hasError':
      throw funkoListLoadable.contents
  }
}

