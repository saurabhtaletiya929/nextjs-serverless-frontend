import React, { useState, useRef } from 'react'
import styles from './Product.module.css'
import ReviewForm from './ReviewForm'
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
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';


export const ProductDetails = ({ product, activeTab, handleTabChange }) => {

    const reviewFormRef = useRef(null);
    const reviewRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const RatingStars = ({ rating }) => {
        return (
            <div>
                <Rating value={rating} readOnly />
            </div>
        )
    }

    const handleReviewFormSubmit = () => {
        setSuccessMessage('You submitted your review successfully!.');
    };

    const handleCloseSuccessMessage = () => {
        setSuccessMessage(null)
    }

    return (
        <Paper sx={{ m: '50px 0' }}>
            <Box sx={{ border: 1, borderColor: 'divider' }}>
                <Tabs value={activeTab} onChange={(event, newValue) => handleTabChange(newValue)} aria-label="basic tabs example" sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tab label="Detail" />
                    <Tab label="More Information" />
                    <Tab label="Review" />
                </Tabs>
                {activeTab === 0 && (
                    <Container maxWidth="xl">
                        {product.description?.html && (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{ __html: product.description.html }}
                            />
                        )}
                    </Container>
                )}
                {activeTab === 1 && (
                    <Container maxWidth="xl" sx={{ m: "20px 0" }}>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Style:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>{product.style_general}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Material:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>{product.material}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Pattern:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>{product.pattern}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} >
                            <Grid item sm={2}>
                                <Typography>Climate:</Typography>
                            </Grid>
                            <Grid item sm={2}>
                                <Typography>{product.climate}</Typography>
                            </Grid>
                        </Grid>
                    </Container>
                )}
                {activeTab === 2 && (
                    <Container maxWidth="xl">
                        <Box id="review" ref={reviewRef}>
                            <Typography variant='h5' sx={{ m: "20px" }}>Customer Reviews</Typography>
                            {product.reviews.items && product.reviews.items.length > 0 ? (
                                product.reviews.items.map((review) => (
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
                                <Typography sx={{ margin: '30px' }}>No reviews available</Typography>
                            )}
                        </Box>
                        <Box id="addyourreview" ref={reviewFormRef}>
                            {successMessage && (
                                <Box sx={{ backgroundColor: '#d2ebd2', color: 'black', padding: '10px', marginTop: '20px', fontSize: '20px' }}>
                                    {successMessage}
                                    <span
                                        style={{ cursor: 'pointer', marginLeft: '990px', color: 'green' }}
                                        onClick={handleCloseSuccessMessage}
                                    >
                                        &#10006; 
                                    </span>
                                </Box>
                            )}
                            <ReviewForm onSubmitSuccess={handleReviewFormSubmit} product={product} />
                        </Box>
                    </Container>
                )}
            </Box>

        </Paper>
    )
}