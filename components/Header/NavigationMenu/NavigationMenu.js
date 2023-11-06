import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./NavigationMenuGraphql.js"; // Import your query
import { Button, List, ListItem, ListItemText, Menu } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./NavigationMenu.module.css";



import Link from "next/link.js";

const classes = makeStyles((theme)  => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
  },
  listItem: {
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  subCategoryList: {
    paddingLeft: theme.spacing(2),
  },
  category: {
    textDecoration: none,
  }
}));

const CategoryItem = ({ category, categoryUrlSuffix }) => {
  // const [open, setOpen] = useState(false);

  // const toggleSubcategories = () => {
  //   setOpen(!open);
  // };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={{
          pathname: `/${category.url_path + categoryUrlSuffix}`,
          query: { type: "CATEGORY" },
        }}
        as={`/${category.url_path + categoryUrlSuffix}`}
      >
      <ListItem>
        <ListItemText primary={category.name} />
        {category.children && category.children.length > 0 && (
          isHovered ? <ArrowDropDownIcon /> : <ArrowRightIcon />
        )}
      </ListItem>
      </Link>
      
      {category.children && category.children.length > 0 && isHovered && (
        <List className={classes.subCategoryList} cl>
          {category.children.map((child) => (
            <Link
              key={child.id}
              href={`/${child.url_path + categoryUrlSuffix}`}
            >
              <ListItem  className={classes.listItem}>
                <ListItemText primary={child.name} />
              </ListItem>
            </Link>
          ))}
        </List>
      )}
    </div>
  );
};

export const NavigationMenu = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const store = props?.storeConfig;
  const categoryUrlSuffix = store?.category_url_suffix ?? "";

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <ListItem className={styles.navigationMenu}>
      {data.categoryList.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          categoryUrlSuffix={categoryUrlSuffix}
        />
      ))}
    </ListItem>
  );
};

// export const NavigationMenu = (props) => {
//   const { loading, error, data } = useQuery(GET_CATEGORIES);

//   const store = props?.storeConfig;
//   const categoryUrlSuffix = store?.category_url_suffix ?? "";

//   const [anchorEl, setAnchorEl] = useState(null);

//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

  

//   // const renderCategory = (category) => (
//   //   <MenuList key={category.id} className={classes.listItem}>
      // <Link
      //   href={{
      //     pathname: `/${category.url_path + categoryUrlSuffix}`,
      //     query: { type: "CATEGORY" },
      //   }}
      //   as={`/${category.url_path + categoryUrlSuffix}`}
      // >
      //   <ListItemText primary={category.name} />
      // </Link>
//   //     {category.children && category.children.length > 0 && (
//   //       <MenuItem>{category.children.map((child) => renderCategory(child))}</MenuItem>
//   //     )}
//   //   </MenuList>
//   // );

//   return (
//     // <MenuItem>{data.categoryList.map((category) => renderCategory(category))}</MenuItem>
//   );
// };
