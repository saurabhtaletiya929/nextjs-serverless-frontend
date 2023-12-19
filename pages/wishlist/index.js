import { useQuery } from "@apollo/client";
import { GET_CUSTOMER_WISHLIST } from "~/components/Wishlists/CustomerWishlistGraphql";
import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Aside } from "~/components/Aside/Aside";

import { useAuth } from "~/providers/context/AuthContext";
import { Wishlist } from "~/components/Wishlists";
import styles from "~/components/Wishlists/Wishlist.module.css";

const Wishlists = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_WISHLIST);
  const { token, setToken } = useAuth();
  const [wishLists, setWishLists] = useState();

  const wishListData = data?.customer?.wishlists[0]?.items_v2?.items;
  // const wishListProducts = wishListData?.items_v2?.items;
  //const wishListData = data?.customer?.wishlists?.items_v2?.items;

  useEffect(() => {
    const res = localStorage.getItem("token");
    setToken(res);
    if (token) {
      setWishLists(wishListData);
    }
  }, [wishListData]);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={3}>
        <Aside></Aside>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Typography variant="h5" mb={2}>
          My Wish List
        </Typography>
        <Box className={styles.wishlistHolder}>
          {wishLists?.map((wishListItem, key) => {
            return <Wishlist key={key} wishListItem={wishListItem}></Wishlist>;
          })}
        </Box>
      </Grid>
    </Grid>
  );
};
export default Wishlists;
