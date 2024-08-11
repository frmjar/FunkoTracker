import { Bars3Icon } from '@heroicons/react/24/outline'
import { funkoSearchState } from 'atoms'
import { useRecoilState } from 'recoil'

export interface HeaderProps {
  hideMenu?: boolean
}

export default function Header(props: HeaderProps) {
  const { hideMenu } = props
  const [funkoSearch, setFunkoSearch] = useRecoilState(funkoSearchState)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setFunkoSearch(formData.get("funkoSearch") as string)
  }

  return (
    <>
      <div className='navbar bg-base-100 mx-auto max-w-7xl mt-4 shadow-lg rounded-box'>
        <div className='navbar-start w-1/3'>
          {!hideMenu && (
            <div className='dropdown'>
              <label tabIndex={0} className='btn btn-ghost btn-circle content-center' >
                <Bars3Icon className='w-6 h-6' />
              </label>
            </div>
          )}
        </div>
        <div className='navbar-center w-full md:w-2/3 lg:1/3'>
          <form className='flex items-stretch' onSubmit={(e) => handleSubmit(e)}>
            <input type="text" name="funkoSearch" placeholder="Search funko" className="input input-bordered w-full max-w-lg focus:border-none" />
            <button className="btn btn-primary ml-2">Search</button>
          </form>
        </div>
      </div>
    </>
  )
}
