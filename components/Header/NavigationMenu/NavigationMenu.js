import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./NavigationMenuGraphql.js";
import { Button, MenuItem, ListItem, List } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./NavigationMenu.module.css";

import Link from "next/link.js";

const CategoryItem = ({ category, categoryUrlSuffix }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <ListItem
      className={styles.categoryItem}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button>
        <Link
          href={{
            pathname: `/${category.url_path + categoryUrlSuffix}`,
            query: { type: "CATEGORY" },
          }}
          as={`/${category.url_path + categoryUrlSuffix}`}
        >
          {category.name}
        </Link>

        {category.children &&
          category.children.length > 0 &&
          (isHovered ? <ArrowDropDownIcon /> : <ArrowRightIcon />)}
      </Button>

      {category.children && category.children.length > 0 && (
        <List className={styles.subMenu}>
          {category.children.map((child) => (
            <ListItem key={child.id}>
              <Link
                href={`/${child.url_path + categoryUrlSuffix}`}
                as={`/${child.url_path + categoryUrlSuffix}`}
              >
                {child.name}
              </Link>
            </ListItem>
          ))}
        </List>
      )}
    </ListItem>
  );
};

export const NavigationMenu = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const store = props?.storeConfig;
  const categoryUrlSuffix = store?.category_url_suffix ?? "";

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <List className={styles.navigationMenu}>
      {data.categoryList.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          categoryUrlSuffix={categoryUrlSuffix}
        />
      ))}
    </List>
  );
};