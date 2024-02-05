import React, { useState, useEffect, useRef } from 'react'
import styles from './Product.module.css'
import { useQuery } from '@apollo/client'
import PRODUCT_QUERY from './Product.graphql'
import Price from '~/components/Price'
import Head from 'next/head'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { AddToCart } from './AddToCart'
import {
  Typography,
  Box,
  Grid,
  Container,
  IconButton,
  Link,
} from '@mui/material'
import { ProductDetails } from './ProductDetails.js'
import { ColorSizeField } from './ColorSizeField'
import { QuantityField } from './QuantityField'
import { RelatedProducts } from './RelatedProducts'
import { animateScroll as scroll } from 'react-scroll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import ScrollToReview from './ScrollToReview';
import { isEmpty } from 'lodash'



export const Product = ({ filters }) => {

  const { loading, data } = useQuery(PRODUCT_QUERY, { variables: { filters } });
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState({ color: '', size: '', quantity: '' })
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const sliderRef = useRef(null);
  const [priceVariant, setPriceVariant] = useState(null);

  const product = data?.products?.items[0] || [];


  useEffect(() => {
    if (!isEmpty(product?.configurable_options)) {
      const size = product?.configurable_options.find(o => o.attribute_code === 'size')?.values[0]?.label || '';
      const color = product?.configurable_options.find(o => o.attribute_code === 'color')?.values[0]?.label || '';

      if (color && size) {
        setSelectedColor(color);
        setSelectedSize(size);

        const variant = findVariant(color, size);
        setPriceVariant(variant);
      }
    }
  }, [product?.configurable_options]);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  if (loading && !data) return <div>⌚️ Loading...</div>;

  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? "";


  function findVariant(color, size) {
    return product?.variants.find(v =>
      v.attributes.some(a => a.code === 'color' && a.label === color) &&
      v.attributes.some(a => a.code === 'size' && a.label === size)
    ) || null;
  }

  const selectedVariant = findVariant(selectedColor, selectedSize);
  const mediaGallery = selectedVariant?.product?.media_gallery || [];

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);

    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }

  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    setError((prev) => ({ ...prev, color: '' }));
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    setError((prev) => ({ ...prev, size: '' }));

  };

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value, 10) || '';
    setQuantity(value);
    setError((prev) => ({ ...prev, quantity: '' }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    scroll.scrollToTop();
  };

  return (
    <Container maxWidth="xl">
      <Head>
        <title>{product.name}</title>
      </Head>

      <Grid container spacing={2} sx={{ m: '50px 0' }}>
        <Grid item xs={12} md={6} className={styles.sliderContainer}>

          <Slider {...settings} ref={sliderRef} className={styles.slider}>
            {mediaGallery.map((image, index) => (
              <div
                className={styles.slide}
                key={index}>
                <img
                  src={`${image.url}?width=500&height=620&webp=auto`}
                  width={700}
                  height={500}
                  alt={image.label}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className={styles.image}
                />
              </div>
            ))}
          </Slider>

          {mediaGallery.map((image, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(index)}
              className={`${styles.slide} ${index === selectedImageIndex ? styles.active : ''}`}
            >
              <img
                src={`${image.url}?width=500&height=620&webp=auto`}
                width={100}
                height={124}
                alt={image.label}
                loading={index === 0 ? 'eager' : 'lazy'}
                className={styles.image}
              />
            </div>
          ))}

        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant='h4' sx={{ p: "10px 0" }}>{product.name}</Typography>

          <ScrollToReview product={product} setActiveTab={setActiveTab} />

          <Box>
            <Grid container spacing={2} >
              <Grid item xs={6}>
                <div>
                  <Typography>As low as</Typography>
                  <Typography className={styles.price}><Price {...(priceVariant ? selectedVariant.product.price_range : product.price_range)} /></Typography>
                </div>
              </Grid>
              <Grid item xs={6}>
                <Typography>IN STOCK</Typography>
                <Typography className={styles.sku}>SKU. {product.sku}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ borderBottom: 1, borderColor: 'black', m: '0 270px 30px 0' }}></Box>
          <ColorSizeField
            product={product}
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            error={error}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
          />

          <QuantityField
            quantity={quantity}
            handleQtyChange={handleQtyChange}
            error={error}
          />

          <AddToCart
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            quantity={quantity}
            error={error}
            setError={setError}
          />

          <Box sx={{ m: "30px 0" }}>
            <Link href="#Wishlist" sx={{ color: '#0000009e', textDecoration: 'none' }}>
              <FavoriteIcon className={styles.icon} />
              <Typography variant='div' sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
                ADD TO WISH LIST
              </Typography>
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link href="#compare" sx={{ color: '#0000009e', textDecoration: 'none' }}>
              <CompareIcon className={styles.icon} />
              <Typography variant='div' sx={{ display: 'inline-block', verticalAlign: 'middle' }}>
                ADD TO COMPARE
              </Typography>
            </Link>
          </Box>

        </Grid>
      </Grid>

      <ProductDetails
        product={product}
        activeTab={activeTab}
        handleTabChange={handleTabChange}
      />

      <RelatedProducts
        product={product}
        productUrlSuffix={productUrlSuffix}
      />

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
