import React from 'react';
import styles from './ReviewBar.module.css';
import { Star } from '@mui/icons-material';
import { Rating, Grid, Box, Typography } from '@mui/material';

export const ReviewBar = ({ product }) => {
    let starCounts = {
        "5": 0,
        "4": 0,
        "3": 0,
        "2": 0,
        "1": 0
    };

    product.reviews?.items.forEach(review => {
        const rating = parseInt(review.ratings_breakdown[0].value);
        starCounts[rating]++;
    });

    const totalCount = product.review_count;
    // const totalCount = 80;
    console.log(totalCount, 'totalcount');
    let starPercentages = {};
    for (let rating in starCounts) {
        starPercentages[rating] = (100 * starCounts[rating]) / totalCount?.toFixed(2);
    }

    console.log(starCounts, 'starCounts');
    const starRatingsOrder = ['5', '4', '3', '2', '1'];

    const RatingStars = ({ rating }) => {
        return (
            <div>
                <Rating value={rating} precision={0.1} readOnly />
            </div>
        )
    }

    const totalRatings = product.reviews?.items.reduce((total, review) => total + parseInt(review.average_rating), 0);
    const averageRating = (totalRatings / product.reviews?.items.length) * 5 / 100;

    if (isNaN(averageRating)) {
        return null;
    }

    return (
        <Box sx={{m: '25px'}}>
            <Typography variant='h6' sx={{ m: "20px" }}>Star Ratings</Typography>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '5px' }}>
                        <span className={styles.rtng}>{averageRating.toFixed(1)}</span>
                        <p>{product.review_count} Ratings</p>
                        <RatingStars rating={averageRating} />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8}>
                    <ul>
                        {starRatingsOrder.map(rating => (
                            <li key={rating} className={styles.bardisplay}>
                                <span>{rating}</span>
                                <Star sx={{ color: '#faaf00', fontSize: 'small', margin: '0 7px' }} />
                                <div className={styles.barcontainers}>
                                    <div className={`${styles.bar} ${styles['color' + rating]}`} style={{ width: `${Math.min(starPercentages[rating], 100)}%` }}></div>
                                </div>
                                {/* <span>({starPercentages[rating]}%)</span> */}
                                <span>({starCounts[rating]})</span>
                            </li>
                        ))}
                    </ul>
                </Grid>
            </Grid>
        </Box>
    );
};



