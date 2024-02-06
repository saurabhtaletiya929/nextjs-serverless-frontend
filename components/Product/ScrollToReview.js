import React, { useState, useRef, useEffect } from 'react'
import {
    Box,
    Link,
    Rating
  } from '@mui/material'
import styles from './Product.module.css';

const scrollToReview = ({ product, setActiveTab }) => {

    const reviewFormRef = useRef(null);
    const reviewRef = useRef(null);

    const RatingStars = ({ rating }) => {
      return (
          <div>
              <Rating value={rating} readOnly />
          </div>
      )
  }

    return(
        <Box sx={{ margin: "20px 0" }}>
            {product.reviews.items && product.reviews.items.length > 0 ? (
              <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Link href="#review" className={styles.review} onClick={() => {
                  setActiveTab(1);
                  reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  <Box className={styles.ratings}>{product.review_count}</Box>
                  <RatingStars rating={product.review_count} />
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="#addyourreview" className={styles.review} onClick={() => {
                  setActiveTab(1);
                  reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Add Your Review
                </Link>
              </Box>
            ) : (
              <Link href="#addyourreview" className={styles.review} onClick={() => {
                setActiveTab(1);
                reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Be the First Reviewer
              </Link>
            )}
          </Box>
    )
}

export default scrollToReview