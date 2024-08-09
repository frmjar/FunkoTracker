import Header, { HeaderProps } from 'components/v2/Layout/Header'

export interface CommonLayoutProps {
  children?: any
  headerProps?: HeaderProps
}


export default function CommonLayout(props: CommonLayoutProps) {
  const { headerProps, children } = props

  return (
    <>
      <div className='min-h-full'>
        <Header {...headerProps} />

        <main>
          <div className='mx-auto max-w-7xl py-6 px-4'>
            {children}
          </div>
        </main>
      </div>
    </>
  )
}
