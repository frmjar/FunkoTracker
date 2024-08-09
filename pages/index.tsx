import type { NextPage } from 'next'
import Head from 'next/head'

import FunkoList from 'components/v2/Cards/FunkoCardList'
import CommonLayout from 'components/v2/Layout'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Funko traker</title>
        <meta name='description' content='Funko traker Home Page' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <CommonLayout headerProps={{ hideMenu: true }}>
        <FunkoList />
      </CommonLayout>
    </>
  )
}

export default Home
