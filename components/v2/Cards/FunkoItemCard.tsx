import Image from 'next/image'
import HalfRating from 'components/v2/Rating/HalfRating'
import { IMG_DEFAULT_URL } from 'const'
import { FunkoProps } from 'const/interfaces'

export function FunkoItemCard({ funko }: { funko: FunkoProps }) {

  const { name, image, link, web, price, shipping, stars, reviews } = funko || {}
  const rating = stars?.match(/\d+,\d+/)?.[0] || 0

  return (
    <div className='card card-compact w-96 bg-base-100 shadow-xl'>
      <figure>
        {
          image ? (
            <Image
              src={`/api/funkos/img?url=${encodeURIComponent(image)}`} alt={name}
              width={250}
              height={100}
              style={{ minWidth: '170px', width: 'auto', height: 'auto' }} unoptimized />
          ) : (
            <Image
              src={`/api/funkos/img?url=${encodeURIComponent(IMG_DEFAULT_URL)}`}
              alt={name}
              width={250}
              height={100}
              style={{ minWidth: '170px', width: 250, height: 'auto' }} unoptimized />
          )
        }
      </figure>
      <div className='card-body'>

        <div className='text-sm text-slate-500'>
          {web?.replaceAll(`_nbsp_`, ` `).replaceAll(`_amp_`, `&`)}
        </div>

        <h2 className='card-title text-lg'>
          <a href={link} target='_blank' rel="noopener noreferrer">{name}</a>
        </h2>

        <HalfRating rating={rating} review={reviews} />

        <div className='card-actions justify-end font-bold text-xl w-100 mt-auto'>
          {shipping && <span className='font-normal text-sm mr-4 leading-7'>{shipping}</span>}  {price}
        </div>
      </div>
    </div>
  )
}
