import { Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { resolveImage } from "~/lib/resolve-image";
import styles from "./Wishlist.module.css";

export const Wishlist = ({ wishListItem }) => {
  return (
    <>
      <div className={styles.wishListItem}>
        <Image
          src={resolveImage(wishListItem.product.thumbnail.url)}
          alt={wishListItem.product.thumbnail.url}
          width={240}
          height={300}
          priority={true}
        ></Image>
        <Typography className={styles.productDetail}>
          {wishListItem.product.name}
        </Typography>
      </div>
    </>
  );
};
