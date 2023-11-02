import React, { useCallback } from 'react'
import styles from './CmsBlocks.module.css'
import { useQuery } from '@apollo/client'
import CMS_QUERY from './CmsBlocks.graphql'
import Head from 'next/head'

export const CmsBlocks = ({ identifier }) => {
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
            return <HTMLContent html={cms.content} />
          </div>
        </div>
      </div>
    </>
  )
}
