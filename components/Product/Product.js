import React, { useState, useRef } from 'react'
import styles from './Product.module.css'
import { useQuery, useMutation } from '@apollo/client'
import { resolveImage } from '~/lib/resolve-image'
import PRODUCT_QUERY from './Product.graphql'
import Price from '~/components/Price'
import Button from '~/components/Button'
import Head from 'next/head'
import { TabPanel, Tabs, Tab } from '@mui/material';
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
  IconButton
} from '@mui/material'
import { ProductDetails } from './ProductDetails.js'
import { ColorField } from './ColorField'


export const Product = ({ filters, cartId, cartItems }) => {

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
          // Handle unexpected response format
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

  return (
    <Container maxWidth="xl">
      <Head>
        <title>{product.name}</title>
      </Head>

      <Grid container spacing={2} sx={{ m: '50px 0' }}>
        <Grid item xs={12} md={6} className={styles.sliderContainer}>
          {/* {product.__typename === 'ConfigurableProduct' && ( */}

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
          {/* )} */}
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
          <ColorField 
          ColorField={product}
          selectedColor={selectedColor}
          handleColorChange={handleColorChange}
          colorError={colorError}
          selectedSize={selectedSize}
          handleSizeChange={handleSizeChange}
          sizeError={sizeError}
          />
          {/* <Grid container spacing={2}>
            {product.configurable_options.map((attribute) => (
              <Grid item xs={6} key={attribute.id}>
                <Typography>{attribute.label}:</Typography>
                <FormControl sx={{ minWidth: 90 }} size="small">
                  <InputLabel id={`${attribute.attribute_code}-label`}>
                    {attribute.label}
                  </InputLabel>
                  <Select
                    labelId={`${attribute.attribute_code}-label`}
                    id={`${attribute.attribute_code}-select`}
                    value={attribute.attribute_code === 'color' ? selectedColor : selectedSize}
                    label={attribute.label}
                    onChange={attribute.attribute_code === 'color' ? handleColorChange : handleSizeChange}
                  >
                    {attribute.values.map((option) => (
                      <MenuItem key={option.value_index} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {attribute.attribute_code === 'color' && colorError && (
                  <Typography color="error">{colorError}</Typography>
                )}
                {attribute.attribute_code === 'size' && sizeError && (
                  <Typography color="error">{sizeError}</Typography>
                )}
              </Grid>
            ))}
          </Grid> */}

          <Box sx={{ m: '30px 0' }}>
            <Typography>Qty</Typography>
            <TextField 
            sx={{ minWidth: 10 }} 
            size="small"
            value={quantity}
            onChange={(e) => handleQtyChange(e)}
            >
            Qty
            </TextField>
            {quantityError && <Typography color="error">{quantityError}</Typography>}
          </Box>

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

      <ProductDetails TabsProduct={product} />

      <Box sx={{ m: '50px 0' }}>
        <Typography>We found other products you might like!</Typography>
        <Grid container spacing={2}>
          {product.related_products.map((relatedProduct) => {

            const productPath = `/${relatedProduct.url_key + productUrlSuffix}`;

            console.log("Generated URL:", productPath);

            return (
              <Grid item key={relatedProduct.uid} xs={12} sm={6} md={4} lg={3}>
                <Link
                  href={productPath}
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