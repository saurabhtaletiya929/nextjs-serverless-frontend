import { useQuery } from '@apollo/client'
import React from 'react'
import styles from './Header.module.css'
import APP_QUERY from '../App/App.graphql'
import Link from 'next/link'
import { resolveImage } from '~/lib/resolve-image'

export const Header = ({ children }) => {
  const { data } = useQuery(APP_QUERY)

  const store = data?.storeConfig

  const categoryUrlSuffix = store?.category_url_suffix ?? ''

  const categories = data?.categoryList[0].children

  return (
    <>
        <header className={styles.header}>
          <Link href="/">
              <img
                src={
                  store?.header_logo_src
                    ? resolveImage(
                        store.base_media_url + 'logo/' + store.header_logo_src
                      )
                    : '/static/logo.png'
                }
                alt={store?.logo_alt ?? 'Store'}
              />
          </Link>
          <nav className={styles.categoriesWrapper}>
            <ul className={styles.categories}>
              {categories?.map((category) => (
                <li key={category.id}>
                  <Link
                    href={{
                      pathname: `/${category.url_key + categoryUrlSuffix}`,
                      query: { type: 'CATEGORY' },
                    }}
                    as={`/${category.url_key + categoryUrlSuffix}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>
    </>
  )
}
