import React, { useState, useRef } from 'react'
import styles from './Product.module.css'
import { useQuery, useMutation } from '@apollo/client'
import { resolveImage } from '~/lib/resolve-image'
import PRODUCT_QUERY from './Product.graphql'
import Price from '~/components/Price'
import Button from '~/components/Button'
import Head from 'next/head'
import { TabPanel, Tabs, Tab } from '@mui/material';
// import RelatedProducts from '../RelatedProducts'
import ReviewForm from '../ReviewForm/ReviewForm'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { 
  Typography, 
  Box, 
  Link, 
  Grid, 
  Rating, 
  Paper, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Container, 
  IconButton } from '@mui/material'


export const Product = ({ filters }) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  const reviewFormRef = useRef(null);
  const reviewRef = useRef(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { loading, data } = useQuery(PRODUCT_QUERY, { variables: { filters } });

  if (loading && !data) return <div>⌚️ Loading...</div>

  const product = data?.products.items[0] || [];
  console.log('product:', product);

  // const relatedProducts = product.related_products || [];
  // console.log('image:', relatedProducts.thumbnail.url);


  // const productUrlSuffix = product. product_url_suffix ?? "";

  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? "";
  //  console.log('relatedProducts.url_key:', relatedProducts.url_key);
  //  console.log('productUrlSuffix:', productUrlSuffix);
  // console.log('productreview:', product.reviews.items.summary);

  const aggregations = data?.products.aggregations || [];
  console.log('aggregations:', aggregations);

  const RatingStars = ({ rating }) => {
    return (
      <div>
        <Rating value={rating} readOnly />
      </div>
    )
  }

  return (
    <Container maxWidth="xl">
      <Head>
        <title>{product.name}</title>
      </Head>

      <Grid container spacing={2} sx={{ m: '50px 0' }}>
        <Grid item xs={12} md={6} className={styles.sliderContainer}>
        <Slider {...settings} className={styles.slider}>
          {product.media_gallery
            .filter((media) => media.type === 'ProductImage')
            .map((image, index) => (
              <div className={styles.slide}>
              <img
                key={index}
                src={
                  resolveImage(image.url) + '?width=1000&height=1240&webp=auto'
                }
                width={500}
                height={700}
                alt={image.label}
                loading={index === 0 ? 'eager' : 'lazy'}
                className={styles.image}
              />
              </div>
            ))}
        </Slider>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h4' sx={{ p: "10px 0" }}>{product.name}</Typography>
          <Box sx={{ margin: "20px 0" }}>
            <Link href="#review" onClick={() => {
              if (reviewRef.current) {
                reviewRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Review
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link href="#addyourreview" onClick={() => {
              if (reviewFormRef.current) {
                reviewFormRef.current.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              Add Your Review
            </Link>
          </Box>

          <Box>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <div>
                  <Typography>As low as</Typography>
                  <Typography className={styles.price}><Price {...product.price_range} /></Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography>IN STOCK</Typography>
                <Typography className={styles.sku}>SKU. {product.sku}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'black', m: '0 270px 30px 0' }}></Box>

          <Grid container spacing={2} >
            <Grid item xs={6}>
              <Typography>{aggregations[10].label}:</Typography>
              <FormControl sx={{ minWidth: 90 }} size="small">
                <InputLabel id="color-label">{aggregations[10].label}</InputLabel>
                <Select
                  labelId="color-label"
                  id="color-select"
                  value={selectedSize}
                  label="Size"
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {aggregations[10].options.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <Typography>{aggregations[10].options.map((option) => option.label).join(', ')}</Typography> */}
            </Grid>

            <Grid item xs={6}>
              <Typography>{aggregations[12].label}:</Typography>
              <FormControl sx={{ minWidth: 90 }} size="small">
                <InputLabel id="color-label">{aggregations[12].label}</InputLabel>
                <Select
                  labelId="color-label"
                  id="color-select"
                  value={selectedColor}
                  label="Color"
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {aggregations[12].options.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* <Typography>{aggregations[12].options.map((option) => option.label).join(', ')}</Typography> */}
            </Grid>
          </Grid>

          <Box sx={{ m: '30px 0' }}>
            <Typography>Qty</Typography>
            <TextField sx={{ minWidth: 10 }} size="small">Qty</TextField>
          </Box>

          <Button>Add to Cart</Button>

          <Box sx={{ m: "30px 0" }}>
            <Link href="#Wishlist" sx={{ color: 'black', textDecoration: 'none' }}>
              ADD TO WISH LIST
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link href="#compare" sx={{ color: 'black', textDecoration: 'none' }}>
              ADD TO COMPARE
            </Link>
          </Box>

        </Grid>
      </Grid>

      <Paper sx={{ m: '50px 0' }}>
        <Box sx={{ border: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab label="Detail" />
            <Tab label="More Information" />
            <Tab label="Review" />
          </Tabs>
          {value === 0 && (
            <Container maxWidth="xl">
              {product.description?.html && (
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: product.description.html }}
                />
              )}
            </Container>
          )}
          {value === 1 && (
            <Container maxWidth="xl" sx={{ m: "20px 0" }}>
              <Grid container spacing={2} >
                <Grid item sm={2}>
                  <Typography>{aggregations[4].label}:</Typography>
                </Grid>
                <Grid item sm={2}>
                  <Typography>{aggregations[4].options.map((option) => option.label).join(', ')}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} >
                <Grid item sm={2}>
                  <Typography>{aggregations[11].label}:</Typography>
                </Grid>
                <Grid item sm={2}>
                  <Typography>{aggregations[11].options.map((option) => option.label).join(', ')}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} >
                <Grid item sm={2}>
                  <Typography>{aggregations[3].label}:</Typography>
                </Grid>
                <Grid item sm={2}>
                  <Typography>{aggregations[3].options.map((option) => option.label).join(', ')}</Typography>
                </Grid>
              </Grid>
              <Grid container spacing={2} >
                <Grid item sm={2}>
                  <Typography>{aggregations[2].label}:</Typography>
                </Grid>
                <Grid item sm={2}>
                  <Typography>{aggregations[2].options.map((option) => option.label).join(', ')}</Typography>
                </Grid>
              </Grid>
            </Container>
          )}
          {value === 2 && (
            <Container maxWidth="xl">
              <Box ref={reviewRef}>
                <Typography variant='h5' sx={{ m: "20px" }}>Customer Reviews</Typography>
                {product.reviews.items.map((review) => (
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
                ))}
              </Box>
              <Box ref={reviewFormRef}>
                <ReviewForm />
              </Box>
            </Container>
          )}
        </Box>

      </Paper>

      <Box sx={{ m: '50px 0' }}>
        <Typography>We found other products you might like!</Typography>
        <Grid container spacing={2}>
          {product.related_products.map((relatedProduct) => {

            const productPath = `/${relatedProduct.url_key + productUrlSuffix}`;

            console.log("Generated URL:", productPath);

            return (
              <Grid item key={relatedProduct.uid} xs={12} sm={6} md={4} lg={3}>
                <Link
                  href={{
                    pathname: productPath,
                    query: { type: "PRODUCT" },
                  }}
                // as={productPath}
                >
                  <Paper elevation={2} style={{ p: '15px', marginBottom: '15px' }}>
                    <img
                      src={
                        resolveImage(relatedProduct.thumbnail.url) +
                        '?width=1000&height=1240&webp=auto'
                      }
                      alt={relatedProduct.thumbnail.label}
                      style={{ width: '100%', height: 'auto' }}
                    />
                    <Typography variant="subtitle1" sx={{ marginTop: '10px' }}>
                      {relatedProduct.name}
                    </Typography>
                    <Typography>As low as <Price {...product.price_range} /></Typography>
                  </Paper>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Box>

    </Container>
  )
}

const CustomPrevArrow = (props) => (
  <IconButton {...props} className={`${styles.customArrow} ${styles.customArrowLeft}`}>
    <ArrowBackIos />
  </IconButton>
);

const CustomNextArrow = (props) => (
  <IconButton {...props} className={`${styles.customArrow} ${styles.customArrowRight}`}>
    <ArrowForwardIos />
  </IconButton>
);