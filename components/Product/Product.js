import React, { useState, useRef } from 'react'
import styles from './Product.module.css'
import { useQuery, useMutation } from '@apollo/client'
import { resolveImage } from '~/lib/resolve-image'
import PRODUCT_QUERY from './Product.graphql'
import Price from '~/components/Price'
import Button from '~/components/Button'
import Head from 'next/head'
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useCart } from '~/providers/context/CartContext';
import { ADD_TO_CART_MUTATION } from '~/components/Checkout/Cart/Cartgraphql';
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
  const [quantity, setQuantity] = useState(0);
  const [colorError, setColorError] = useState('');
  const [sizeError, setSizeError] = useState('');
  const [quantityError, setQuantityError] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const { loading, data } = useQuery(PRODUCT_QUERY, { variables: { filters } });

  if (loading && !data) return <div>⌚️ Loading...</div>

  const product = data?.products.items[0] || [];
  console.log('product:', product);

  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? "";

  const router = useRouter();
  const { updateCartCount, setItemAdded } = useCart();
  const [addToCartMutation] = useMutation(ADD_TO_CART_MUTATION);

  const handleAddToCart = async () => {

    if (!selectedColor) {
      setColorError('Please select a color.');
    } else {
      setColorError('');
    }

    if (!selectedSize) {
      setSizeError('Please select a size.');
    } else {
      setSizeError('');
    }

    if (quantity <= 0) {
      setQuantityError('Quantity must be greater than 0.');
    } else {
      setQuantityError('');
    }

    if (selectedColor && selectedSize && quantity > 0) {
      try {
        const { data } = await addToCartMutation();

        console.log('GraphQL Response:', data);

        if (data && data.addProductsToCart) {
          const { cart, user_errors } = data.addProductsToCart;

          if (user_errors && user_errors.length > 0) {
            console.error(user_errors);
            alert(`Failed to add item to the cart: ${user_errors[0].message}`);
          } else {

            const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

            console.log('Cart Items:', cart.items[0].product.sku);
            console.log('Total Quantity:', totalQuantity);

            setItemAdded(cart.items);
            updateCartCount(totalQuantity);
            // alert('Item added to the cart successfully!');

            router.push({
              pathname: '/checkout/cart',
              query: { productId: cart.items[0].id, sku: cart.items[0].product.sku },
            });
            // router.push('/checkout/cart');
          }
        } else {
          console.error('Unexpected response format from the server:', data);
        }
      } catch (error) {
        console.error('Error adding to cart:', error.message);
      }
    }
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
    setColorError('');
  };

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
    setSizeError('');
  };

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value, 10) || '';
    setQuantity(value);
    setQuantityError('');
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

          <Slider {...settings} className={styles.slider}>
            {product.media_gallery
              .filter((media) => media.type === 'ProductImage')
              .map((image, index) => (
                <div className={styles.slide}>
                  <img
                    key={index}
                    src={
                      resolveImage(image.url) + `?width=1000&height=1240&webp=auto&color=${selectedColor}`
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
          <ColorSizeField
            product={product}
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            colorError={colorError}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
            sizeError={sizeError}
          />

          <QuantityField
            quantity={quantity}
            handleQtyChange={handleQtyChange}
            quantityError={quantityError}
          />

          <Button onClick={handleAddToCart}>Add to Cart</Button>

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