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
import { ReviewBar } from './ReviewBar';

const MAX_REVIEWS_TO_DISPLAY = 2;

export const ProductDetails = ({ product, activeTab, handleTabChange }) => {

    const reviewFormRef = useRef(null);
    const reviewRef = useRef(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [showAllReviews, setShowAllReviews] = useState(false);

    const toggleShowAllReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

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
        <Box sx={{ m: '50px 0' }}>
                <Tabs
                    value={activeTab}
                    onChange={(event, newValue) => handleTabChange(newValue)}
                    aria-label="tabs"
                    sx={{
                        "& .MuiTabs-flexContainer": {
                            justifyContent: 'center',
                            gap: '200px'
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: '#c96', 
                        },
                    }}
                >
                    <Tab sx={{ fontSize: '17px', color: activeTab === 0 ? '#c96 !important' : '#333333' }} label="Detail" />
                    <Tab sx={{ fontSize: '17px', color: activeTab === 1 ? '#c96 !important' : '#333333', }} label="More Information" />
                    <Tab sx={{ fontSize: '17px', color: activeTab === 2 ? '#c96 !important' : '#333333', }} label="Review" />
                </Tabs>
                <Box sx={{ border: '0.1rem solid #dadada', borderRadius: '0.3rem' }}>
                {activeTab === 0 && (
                    <Container maxWidth="xl" sx={{ m: '20px' }}>
                        {product.description?.html && (
                            <div
                                className={styles.description}
                                dangerouslySetInnerHTML={{ __html: product.description.html }}
                            />
                        )}
                    </Container>
                )}

                {activeTab === 1 && (
                    <Container maxWidth="xl" sx={{ m: "20px" }}>
                        <Box className={styles.information}>
                            <Typography className={styles.info}>Style:</Typography>
                            <Typography sx={{ fontSize: '19px' }}>{product.style_general}</Typography>
                        </Box>
                        <Box className={styles.information}>
                            <Typography className={styles.info}>Material:</Typography>
                            <Typography sx={{ fontSize: '19px' }}>{product.material}</Typography>
                        </Box>
                        <Box className={styles.information}>
                            <Typography className={styles.info}>Pattern:</Typography>
                            <Typography sx={{ fontSize: '19px' }}>{product.pattern}</Typography>
                        </Box>
                        <Box className={styles.information}>
                            <Typography className={styles.info}>Climate:</Typography>
                            <Typography sx={{ fontSize: '19px' }}>{product.climate}</Typography>
                        </Box>
                    </Container>
                )}

                {activeTab === 2 && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <ReviewBar product={product} />
                            <Container maxWidth="xl">
                                <Box id="review" ref={reviewRef}>
                                    <Typography variant='h6' sx={{ m: "20px" }}>Customer Reviews</Typography>
                                    {product.reviews?.items && product.reviews?.items.length > 0 ? (
                                        <>
                                            {product.reviews.items.slice(0, showAllReviews ? product.reviews.items.length : MAX_REVIEWS_TO_DISPLAY).map((review) => (
                                                <Box sx={{ borderBottom: 1, borderColor: 'divider', m: "20px" }}>
                                                    <Typography variant='h6' sx={{ margin: "20px 0" }}>{review.summary}</Typography>
                                                    <Grid container key={review.id} sx={{ p: "25px 0" }}>
                                                        <Grid item xs={12} sm={2}>
                                                            <Typography>{review.ratings_breakdown[0].name}</Typography>
                                                        </Grid>
                                                        <Grid item xs={12} sm={3}>
                                                            <RatingStars rating={review.ratings_breakdown[0].value} />
                                                        </Grid>
                                                        <Grid item xs={12} md={7}>
                                                            <Typography>{review.text}</Typography>
                                                            <Typography>Review by {review.nickname} {review.created_at}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            ))}
                                            {product.reviews.items.length > MAX_REVIEWS_TO_DISPLAY && (
                                                <Typography
                                                    variant="body1"
                                                    sx={{ cursor: 'pointer', color: 'blue', m: '20px' }}
                                                    onClick={toggleShowAllReviews}
                                                >
                                                    {showAllReviews ? 'View Less' : 'View More'}
                                                </Typography>
                                            )}
                                        </>
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
                                </Box>
                            </Container>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ReviewForm onSubmitSuccess={handleReviewFormSubmit} product={product} />
                        </Grid>
                    </Grid>
                )}
            </Box>

        </Box>
    )
}