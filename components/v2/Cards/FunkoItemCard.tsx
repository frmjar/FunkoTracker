import Image from 'next/image'
import HalfRating from 'components/v2/Rating/HalfRating'
import { IMG_DEFAULT_URL } from 'const'
import { FunkoProps } from 'const/interfaces'
import ImageLoad from './ImageLoad'

export function FunkoItemCard({ funko }: { funko: FunkoProps }) {

  const { name, image, imageAlt, link, web, price, currency, shipping, stars, reviews, stock, debug } = funko || {}
  const rating = stars?.match(/\d+,\d+/)?.[0] || 0

  return (
    <div className='card card-compact w-96 bg-base-100 shadow-xl'>
      <figure>
        <ImageLoad
          src={image}
          alt={imageAlt || name}
          fallbackSrc={IMG_DEFAULT_URL} />
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
