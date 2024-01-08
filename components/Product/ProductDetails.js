import React, { useState, useRef } from 'react'
import styles from './Product.module.css'
import ReviewForm from '../ReviewForm/ReviewForm'
import {
    Typography,
    Box,
    Grid,
    Rating,
    Paper,
    Container,
    Tab, 
    Tabs
  } from '@mui/material'

export const ProductDetails = ({ TabsProduct }) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const reviewFormRef = useRef(null);
    const reviewRef = useRef(null);

    const RatingStars = ({ rating }) => {
        return (
          <div>
            <Rating value={rating} readOnly />
          </div>
        )
      }

    return (
        <Paper sx={{ m: '50px 0' }}>
            <Box sx={{ border: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Detail" />
                    <Tab label="More Information" />
                    <Tab label="Review" />
                </Tabs>
                {value === 0 && (
                    <Container maxWidth="xl">
                        {TabsProduct.description?.html && (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{ __html: TabsProduct.description.html }}
                            />
                        )}
                    </Container>
                )}
                {value === 1 && (
                    <Container maxWidth="xl" sx={{ m: "20px 0" }}>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Style:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>Value</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Material:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>Value</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Pattern:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>Value</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Climate:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>Value</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                )}
                {value === 2 && (
                    <Container maxWidth="xl">
                        <Box ref={reviewRef}>
                            <Typography variant='h5' sx={{ m: "20px" }}>Customer Reviews</Typography>
                            {TabsProduct.reviews.items && TabsProduct.reviews.items.length > 0 ? (
                                TabsProduct.reviews.items.map((review) => (
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider', m: "20px" }}>
                                        <Typography variant='h6' sx={{ margin: "20px 0" }}>{review.summary}</Typography>
                                        <Grid container spacing={2} key={review.id} sx={{ p: "25px 0" }}>
                                            <Grid item xs={12} sm={2}>
                                                <Typography>{review.ratings_breakdown[0].name}</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={2}>
                                                <RatingStars rating={review.ratings_breakdown[0].value} />
                                            </Grid>
                                            <Grid item xs={6} sm={8}>
                                                <Typography>{review.text}</Typography>
                                                <Typography>Review by {review.nickname} {review.created_at}</Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                ))
                            ) : (
                                <Typography>No reviews available</Typography>
                            )}
                        </Box>
                        <Box ref={reviewFormRef}>
                            <ReviewForm />
                        </Box>
                    </Container>
                )}
            </Box>

        </Paper>
    )
}