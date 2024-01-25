import React from "react";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./CustomerMenu.module.css";

const customerMenu = [
  {
    title: "My Account",
    href: "/customer/account",
  },
  {
    title: "My Orders",
    href: "/sales/order/history",
  },
  {
    title: "My Downloadable Products",
    href: "/downloadable/customer/products",
  },
  {
    title: "My wish List",
    href: "/wishlist",
  },
  {
    title: "Address Book",
    href: "/customer/address",
  },
  {
    title: "Account Information",
    href: "/customer/account/edit",
  },
  {
    title: "Stored Payment Methods",
    href: "/vault/cards/listaction",
  },
  {
    title: "My Product Reviews",
    href: "/review/customer",
  },
  {
    title: "Newsletter Subscriptions",
    href: "/newsletter/manage",
  },
];

export const CustomerMenu = ({}) => {
  const route = useRouter();
  return (
    <Paper>
      <MenuList className={styles.customerMenu}>
        {customerMenu.map((item, id) => (
          <MenuItem
            key={id}
            className={
              route.pathname == item.href
                ? styles.activeLink
                : styles.nonActiveLink
            }
            sx={{ flexGrow: 1 }}
          >
            <Link href={item.href}>{item.title}</Link>
          </MenuItem>
        ))}
      </MenuList>
    </Paper>
  );
};
