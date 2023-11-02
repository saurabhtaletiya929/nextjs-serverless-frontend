import { useQuery } from '@apollo/client'
import React from 'react'
import styles from './App.module.css'
import APP_QUERY from './App.graphql'
import NextNprogress from 'nextjs-progressbar'
import Head from 'next/head'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'

export const App = ({ children }) => {
  const { data } = useQuery(APP_QUERY)

  const store = data?.storeConfig

  return (
    <>
      <Head>
        <title>{store?.default_title}</title>
      </Head>

      <div className={styles.app}>
        <NextNprogress
          startPosition={0.4}
          stopDelayMs={200}
          height={6}
          options={{ showSpinner: false, easing: 'ease' }}
        />
      <Header/>
        <div className={styles.content}>{children}</div>
      <Footer/>
      </div>
    </>
  )
}
