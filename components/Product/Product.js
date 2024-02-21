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
  Modal,
} from '@mui/material'
import { ProductDetails } from './ProductDetails.js'
import { ColorSizeField } from './ColorSizeField'
import { QuantityField } from './QuantityField'
import { RelatedProducts } from './RelatedProducts'
import { animateScroll as scroll } from 'react-scroll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import ScrollToReview from './ScrollToReview';
import { isEmpty } from 'lodash';
import CloseIcon from '@mui/icons-material/Close';
import { ReviewBar } from './ReviewBar'
import ShareButtons from './ShareIcons';
import dummy from './dummyReview.json'
import { ProductInfo } from './ProductInfo'
import { Magnifier } from 'react-image-magnifiers';


export const Product = ({ filters }) => {

  const { loading, data } = useQuery(PRODUCT_QUERY, { variables: { filters } });
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState({ color: '', size: '', quantity: '' })
  const [activeTab, setActiveTab] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const sliderRef = useRef(null);
  const [priceVariant, setPriceVariant] = useState(null);
  // const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openImageIndex, setOpenImageIndex] = useState(null);
  const [wishlist, setWishlist] = useState({});

  const product = data?.products?.items[0] || [];

  // const product = dummy


  // console.log(product,"product")


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

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        sliderRef.current.slickNext();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [selectedImageIndex]);

  // const handleHoverEnter = (index) => {
  //   setHoveredIndex(index);
  // };

  // const handleHoverLeave = () => {
  //   setHoveredIndex(null);
  // };

  const handleClickImage = (index) => {
    setOpenImageIndex(index);
  };

  const handleCloseModal = () => {
    setOpenImageIndex(null);
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    draggable: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    beforeChange: (current, next) => {
      setSelectedImageIndex(next);
    }
  };

  if (loading && !data) return <div>⌚️ Loading...</div>;

  const productUrlSuffix = data?.storeConfig.product_url_suffix ?? "";

//   const category_name = product.categories?.name;
// if (category_name) {
//     console.log(category_name); // This will log the category name if it's not undefined
// } else {
//     console.log('Category name is undefined');
// }


  // const categories = product.categories.breadcrumbs.category_name;

  // console.log("categories", categories);

  const categoriesWithBreadcrumbs = product.categories?.filter(category => category.breadcrumbs !== null);

  const firstBreadcrumb = categoriesWithBreadcrumbs?.length > 0 ? categoriesWithBreadcrumbs[0] : null;

  const backUrl = firstBreadcrumb ? firstBreadcrumb.breadcrumbs[0].category_url_path + productUrlSuffix + ' ' + '/' : "";

  const categoryName = firstBreadcrumb ? firstBreadcrumb.breadcrumbs[0].category_name + ' ' + '/' : "";

  console.log("categoriesWithBreadcrumbs", categoriesWithBreadcrumbs);

  if (!categoriesWithBreadcrumbs || categoriesWithBreadcrumbs.length === 0) {
    return null;
  }

  // Extract category names from the breadcrumbs
  const breadcrumbItems = categoriesWithBreadcrumbs.flatMap(category => category.breadcrumbs || [])
    .map(breadcrumb => ({
      name: breadcrumb.category_name,
      urlPath: breadcrumb.category_url_path
    }));

  console.log("breadcrumbItems", breadcrumbItems);

  const categories = breadcrumbItems.map(category => category.name);

  console.log('categories', categories);

  function findVariant(color, size) {
    return product?.variants?.find(v =>
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
    // scroll.scrollToTop();
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const isProductWishlisted = (productId) => {
    return wishlist[productId];
  };

  return (
    <Container maxWidth="xl" sx={{ width: '100%', m: '0' }}>
      <header className={styles.header}>
        {breadcrumbItems.map((breadcrumb, index) => (
          <span key={index}>
            <Link href={`/${breadcrumb.urlPath}${productUrlSuffix}`}>
              {breadcrumb.name}
            </Link>
            {index !== breadcrumbItems.length - 1 && <span> / </span>}
          </span>
        ))}
        {/* {backUrl && (
          <Link key={backUrl} href={backUrl} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', fontSize: '20px' }}>
            <span className={styles.backLink}>⬅</span>
            <span>{categoryName}</span>
          </Link>
        )} */}
        <strong style={{ fontSize: '17px' }}>/ {product.name}</strong>
      </header>


      <Grid container sx={{ m: '50px 0', p: '0' }}>

        <Grid xs={12} md={6} sx={{ display: 'flex', padding: '0' }}>
          {/* Box containing images */}
          <Box sx={{ m: '0 20px 0 0' }}>
            {mediaGallery.map((image, index) => (
              <div
                key={index}
                onClick={() => handleImageClick(index)}
                className={`${styles.slide} ${index === selectedImageIndex ? styles.active : ''}`}
              >
                <img
                  src={`${image.url}?width=500&height=620&webp=auto`}
                  width={100}
                  height={125}
                  alt={image.label}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
          </Box>

          {/* Slider */}
          <Slider {...settings} ref={sliderRef} className={styles.slider}>
            {mediaGallery.map((image, index) => (
              <div
                className={styles.slide}
                key={index}
                onClick={() => handleClickImage(index)}
              >
                <Magnifier
                  imageSrc={`${image.url}?width=500&height=620&webp=auto`}
                  alt={image.label}
                  cursorStyle="crosshair"
                  dragToMove={true}
                  mouseActivation="hover"
                  dragWidth={200}
                  dragHeight={200}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  style={{ width: '100%', height: 'auto', maxWidth: '100%', maxHeight: 'auto' }}
                />
              </div>
            ))}
          </Slider>
          <Modal open={openImageIndex !== null} onClose={handleCloseModal}>
            <div className={styles.modalContent}>
              <CloseIcon className={styles.closeIcon} onClick={handleCloseModal} />
              <img
                src={`${mediaGallery[openImageIndex]?.url}?width=800&height=1000&webp=auto`}
                alt={mediaGallery[openImageIndex]?.label}
                className={styles.modalImage}
              />
            </div>
          </Modal>
        </Grid>
        <Grid xs={12} md={6} className={styles.productdetail}>
          <Typography variant='h4' sx={{ p: "10px 0", color: '#333' }}>
            {product.name}
          </Typography>

          <ScrollToReview
            product={product}
            setActiveTab={setActiveTab}
          />

          <Box sx={{ my: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant='body2' sx={{ color: '#555', fontWeight: '900' }}>
                  AS LOW AS
                </Typography>
                <Typography className={styles.price}>
                  <Price {...(priceVariant ? selectedVariant.product.price_range : product.price_range)} />
                </Typography>
              </Grid>
              {/* <Grid item xs={6}>
                <Typography variant='body2' sx={{ color: '#555', fontWeight: '900' }}>
                  IN STOCK
                </Typography>
                <Typography className={styles.sku} sx={{ color: '#777' }}>
                  SKU. {product.sku}
                </Typography>
              </Grid> */}
            </Grid>
          </Box>

          <Box className={styles.productdescription}>
            {product.short_description?.html && (
              <div
                className={styles.shortdescription}
                dangerouslySetInnerHTML={{ __html: product.short_description.html }}
              />
            )}
          </Box>

          {/* <Box sx={{ borderBottom: 1, borderColor: '#ddd', m: '0 270px 30px 0' }}></Box> */}

          <ColorSizeField
            product={product}
            selectedColor={selectedColor}
            handleColorChange={handleColorChange}
            error={error}
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
            categories={categories}
          />

          <QuantityField quantity={quantity} handleQtyChange={handleQtyChange} error={error} />

          {/* <Box sx={{ m: "40px 0" }}> */}
          <Grid container spacing={1}>
            <Grid item xs={4} sx={{ marginBottom: '25px' }}>
              <AddToCart selectedColor={selectedColor} selectedSize={selectedSize} quantity={quantity} error={error} setError={setError} />
            </Grid>
            <Grid item xs={3}>
              <IconButton
                href="#Wishlist"
                className={styles.additem}
                onClick={() => {
                  console.log("Product ID:", product.id);
                  toggleWishlist(product.id);
                }}
              >
                <FavoriteIcon className={`${styles.icon} ${isProductWishlisted(product.id) ? styles.iconwishlisted : ''}`} />
                <Typography variant='div' className={`${styles.addlist} ${isProductWishlisted(product.id) ? styles.wishlisted : ''}`}>
                  {isProductWishlisted(product.id) ? 'Wishlisted' : 'Wishlist'}
                </Typography>
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton href="#compare" className={styles.additem}>
                <CompareIcon className={styles.icon} />
                <Typography variant='div' className={styles.addlist}>
                  Add To Compare
                </Typography>
              </IconButton>
            </Grid>
          </Grid>
          {/* </Box> */}

          <hr></hr>

          <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', m: '15px 0'}}>
            <Box sx={{display: 'flex', color: "#777"}}>
              <Typography sx={{m: '0 15px 0 0'}}>Category:</Typography>
              <Typography>
              {breadcrumbItems.map((breadcrumb, index) => (
                <span key={index}>
                  {breadcrumb.name}
                  {index !== breadcrumbItems.length - 1 && <span>, </span>}
                </span>
              ))}
              </Typography>
            </Box>
            <ShareButtons />
          </Box>
          {/* <ReviewBar product={product} /> */}

          {/* <ProductInfo product={product} /> */}

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
        selectedColor={selectedColor}
        selectedSize={selectedSize}
        quantity={quantity}
        error={error}
        setError={setError}
        isProductWishlisted={isProductWishlisted}
        toggleWishlist={toggleWishlist}
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
