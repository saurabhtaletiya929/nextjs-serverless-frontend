import React, { useState, useRef, useEffect } from 'react'
import {
  Box,
  Link,
  Rating,
  Typography
} from '@mui/material'
import styles from './Product.module.css';
import { Star } from '@mui/icons-material';
import { ReviewBar } from './ReviewBar';
import { Product } from './Product';

const scrollToReview = ({ product, setActiveTab }) => {

  const reviewFormRef = useRef(null);
  const reviewRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const totalRatings = product.reviews?.items.reduce((total, review) => total + parseInt(review.average_rating), 0);
  const averageRating = (totalRatings / product.reviews?.items.length) * 5 / 100;

  return (
    <Box sx={{ margin: "20px 0" }}>
      {product.reviews?.items && product.reviews.items.length > 0 ? (
        <Box style={{ display: 'flex', alignItems: 'center' }} className={styles.linkContainer}>
          <Box sx={{ backgroundColor: '#c96', color: 'white', p: '10px', borderRadius: '7px', fontSize: '18px'}}>{product.stock_status}</Box>
          &nbsp;&nbsp;&nbsp;
          <Box
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="#review" className={`${styles.review} ${styles.reviewbar}`} onClick={() => {
              setActiveTab(2);
              reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Box className={`${styles.ratings} ${averageRating < 3 ? styles.lessThanThree : ''}`}>
                <Typography sx={{ fontSize: '18px' }}>{averageRating.toFixed(1)}</Typography>
                <Star sx={{ fontSize: '1.5rem' }} />
              </Box>
            </Link>
            {isHovered && (
              <div className={styles.reviewBarContainer}>
                <ReviewBar product={product} />
              </div>
            )}
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Link href="#addyourreview" className={styles.review} onClick={() => {
            setActiveTab(2);
            reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}>
            Add Your Review
          </Link>
        </Box>
      ) : (
        <Link href="#addyourreview" className={styles.review} onClick={() => {
          setActiveTab(2);
          reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
        }}>
          Be the First Reviewer
        </Link>
      )}
    </Box>
  )
}

export default scrollToReview