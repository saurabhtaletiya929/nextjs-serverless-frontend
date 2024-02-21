import React from "react";
import { resolveImage } from '~/lib/resolve-image'
import Price from '~/components/Price'
import {
  Typography,
  Box,
  Link,
  Grid,
  Paper,
} from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareIcon from '@mui/icons-material/Compare';
import styles from './Product.module.css'
import { AddToCart } from "./AddToCart";


export const RelatedProducts = ({ product, productUrlSuffix, selectedColor, selectedSize, quantity, error, setError, isProductWishlisted, toggleWishlist }) => {
  return (
    <Box sx={{ m: '50px 0' }}>
      <Typography sx={{ fontSize: '22px', m: '30px 0' }}>We found other products you might like!</Typography>
      <Grid container spacing={2}>
        {product.related_products?.map((relatedProduct) => {

          const productPath = `/${relatedProduct.url_key + productUrlSuffix}`;

          console.log("Generated URL:", productPath);

          return (
            <Grid item key={relatedProduct.uid} xs={12} sm={6} md={4} lg={3}>
              <div className={styles.productContainer}>
                <Paper className={styles.Paper}>
                  <Link
                    href={productPath}
                  // as={productPath}
                  >
                    <Box elevation={2} style={{ p: '15px', marginBottom: '15px' }}>
                      <img
                        src={
                          resolveImage(relatedProduct.thumbnail.url) +
                          '?width=1000&height=1240&webp=auto'
                        }
                        alt={relatedProduct.thumbnail.label}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Box>
                  </Link>

                  <Link href={productPath} className={styles.productname} variant="subtitle1">
                    {relatedProduct.name}
                  </Link>
                  <Typography>As low as <Price {...product.price_range} /></Typography>
                  <Box sx={{ marginTop: '20px', display: 'flex' }}>
                    <Link href="#Wishlist" className={styles.list} onClick={() => toggleWishlist(product.id)}>
                      {/* <FavoriteIcon sx={{ marginRight: '5px' }} className={`${styles.icon} ${isWishlisted ? styles.wishlisted : ''}`} /> */}
                      <FavoriteIcon sx={{ marginRight: '5px' }} className={`${styles.icon} ${isProductWishlisted(product.id) ? styles.iconwishlisted : ''}`} />
                    </Link>
                    {/* <Link href="#compare" className={styles.list}>
                      <CompareIcon sx={{ marginRight: '5px' }} />
                    </Link> */}
                  </Box>

                  <div className={styles.addToCartButton}>
                    <AddToCart selectedColor={selectedColor} selectedSize={selectedSize} quantity={quantity} error={error} setError={setError} />
                  </div>
                </Paper>
              </div>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  )
}