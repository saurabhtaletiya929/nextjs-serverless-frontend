import React from "react";
import { resolveImage } from '~/lib/resolve-image'
import Price from '~/components/Price'
import {
    Typography,
    Box,
    Link,
    Grid,
    Paper,
    Container,
    IconButton
  } from '@mui/material'

export const RelatedProducts = ({ product, productUrlSuffix }) => {
    return(
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
    )
}