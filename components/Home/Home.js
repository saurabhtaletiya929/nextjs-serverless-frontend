import React, { useCallback, useState } from 'react'
import { useQuery } from '@apollo/client'
import styles from './Home.module.css'
import { useDebounce } from 'use-debounce'
import Products from '~/components/Products'
import Cms from '../Cms'
import APP_QUERY from '../App/App.graphql'

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data } = useQuery(APP_QUERY)
  const store = data?.storeConfig
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const cms_home_page = store?.cms_home_page ?? 'home'

  const handleSearch = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()

      setSearchQuery(searchQuery)
    },
    [searchQuery]
  )

  return (
    <div className={styles.home}>
      <form className={styles.search} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="search"
          name="search"
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
        />
      </form>
      <Cms identifier={cms_home_page} />
      <Products search={debouncedSearchQuery} />
    </div>
  )
}
