import { useRecoilValueLoadable } from 'recoil'
import { funkoListQuery } from 'selectors'
import { FunkoItemCard } from './FunkoItemCard'

export default function FunkoList() {
  const funkoListLoadable = useRecoilValueLoadable(funkoListQuery)

  switch (funkoListLoadable.state) {
    case 'hasValue':
      return (
        <div className='flex flex-wrap justify-center gap-4'>
          {funkoListLoadable.contents.data?.values?.map((funko: any) => (
            <FunkoItemCard key={funko.name} funko={funko} />
          ))}
        </div>
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

