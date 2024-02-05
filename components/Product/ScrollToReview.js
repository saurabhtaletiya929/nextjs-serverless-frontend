import React, { useState, useRef, useEffect } from 'react'
import {
    Box,
    Link,
  } from '@mui/material'

const scrollToReview = ({ product, setActiveTab }) => {

    const reviewFormRef = useRef(null);
    const reviewRef = useRef(null);

    return(
        <Box sx={{ margin: "20px 0" }}>
            {product.reviews.items && product.reviews.items.length > 0 ? (
              <>
                <Link href="#review" onClick={() => {
                  setActiveTab(2);
                  reviewRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Review
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link href="#addyourreview" onClick={() => {
                  setActiveTab(2);
                  reviewFormRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}>
                  Add Your Review
                </Link>
              </>
            ) : (
              <Link href="#addyourreview" onClick={() => {
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