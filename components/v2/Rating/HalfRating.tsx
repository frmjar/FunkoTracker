import clsx from 'clsx'
import { Fragment, useId } from 'react'

export interface HalfRatingProps {
  rating?: string | number
  review?: string
}

const STAR_COUNT = 5

export default function HalfRating({ rating = 0, review }: HalfRatingProps) {
  const randomId = useId()

  if (typeof rating === 'string') {
    rating = parseFloat(rating.replaceAll(',', '.'))
  }

  return (
    <div className={clsx('rating rating-sm rating-half')}>
      {new Array(STAR_COUNT).fill(0).map((_, index) => {
        const checkedIdx = Math.floor(rating)
        const isHalf = rating - checkedIdx >= 0.4 && rating - checkedIdx < 0.71
        const isNearNext = rating - checkedIdx >= 0.71

        return (
          <Fragment key={index}>
            {index === 0 && checkedIdx === 0 && !isHalf && (
              <input
                type='radio'
                name={`${randomId}-rating-${index}-hidden`}
                className='rating-hidden hidden'
                disabled
                readOnly
                defaultChecked
              />
            )}
            <input
              type='radio'
              name={`${randomId}-rating-${index}-half`}
              className='bg-green-500 mask mask-star-2 mask-half-1'
              checked={(index === checkedIdx && isHalf)}
              disabled
              readOnly
              value={index + 0.5}
            />
            <input
              type='radio'
              name={`${randomId}-rating-${index}-full`}
              className='bg-green-500 mask mask-star-2 mask-half-2'
              checked={index + 1 === checkedIdx && (!isHalf && !isNearNext)}
              disabled
              readOnly
              value={index + 1}
            />
          </Fragment>
        )
      })}
      {review && <span className='ml-1 leading-tight'>({review})</span>}
    </div>
  )
}
