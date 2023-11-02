import React, { useCallback } from 'react'
import styles from './Cms.module.css'
import { useQuery } from '@apollo/client'
import CMS_QUERY from './Cms.graphql'
import Head from 'next/head'

export const Cms = ({ identifier }) => {
  const { loading, data } = useQuery(CMS_QUERY, { variables: { identifier } })

  const cms = data?.cmsPage

  if (loading && !data) return <div>⌚️ Loading...</div>

  const HTMLContent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <>
      <Head>
        <title>{cms.title}</title>
      </Head>
      <div className={styles.product}>
        <div className={styles.content}>
          <div className={styles.detailsWrapper}>
            <HTMLContent html={cms.content} />
          </div>
        </div>
      </div>
    </>
  )
}
