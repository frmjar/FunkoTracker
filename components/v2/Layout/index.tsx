import Header, { HeaderProps } from 'components/v2/Layout/Header'
import Footer from './Footer'

export interface CommonLayoutProps {
  children?: any
  headerProps?: HeaderProps
}


export default function CommonLayout(props: CommonLayoutProps) {
  const { headerProps, children } = props

  return (
    <>
      <div className='flex flex-col min-h-screen'>
        <Header {...headerProps} />

        <main className='flex-grow'>
          <div className='mx-auto max-w-7xl py-6 px-4'>
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
