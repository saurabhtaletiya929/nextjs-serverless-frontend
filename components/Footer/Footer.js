import { useQuery } from '@apollo/client'
import React from 'react'
import styles from './Footer.module.css'
import CMS_BLOCKS_QUERY from '../CmsBlocks/CmsBlocks.graphql'

export const Footer = ({ children }) => {
  const { loading, data, error } = useQuery(CMS_BLOCKS_QUERY, {
    variables: { identifiers: ['footer_links_block'] },
  })
  const cmsBlock = data?.cmsBlocks?.items[0]
  const HTMLContent = ({ html }) => {
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };
  return (
    <>
      <footer className={styles.footer}>
        <div className="footer-container">
            <div className="footer">
              return <HTMLContent html={cmsBlock?.content} />
            </div>
          <address>copyright</address>
        </div>
      </footer>
    </>
  )
}
