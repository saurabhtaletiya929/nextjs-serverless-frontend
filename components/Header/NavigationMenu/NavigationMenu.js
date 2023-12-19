import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./NavigationMenuGraphql.js";
import {
  Button,
  MenuItem,
  ListItem,
  List,
  Menu,
  useMediaQuery,
  useTheme,
  MenuList,
  Drawer,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import styles from "./NavigationMenu.module.css";

import Link from "next/link.js";
import { CloseOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";

const hamburgerClasses = makeStyles({
  subMenuExpanded: {
    "& .MuiAccordionDetails-root": {
      padding: "0 15px 15px",
    },
    "& .MuiAccordionSummary-root": {
      minHeight: "auto",
    },
    "& .MuiAccordionSummary-content": { margin: "12px 0", fontWeight: "600" },
  },
});

export const NavigationMenu = ({
  storeConfig,
  isMobileView,
  isOpenMenu,
  toglleMenu,
}) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const store = storeConfig;
  const categoryUrlSuffix = store?.category_url_suffix ?? "";

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <>
      {isMobileView ? (
        <Drawer
          width={window.width}
          open={isOpenMenu}
          onClose={toglleMenu}
          PaperProps={{
            sx: { width: "90%" },
          }}
        >
          <ul className={styles.mobileNav}>
            {data.categoryList.map((category) => (
              <CategoryItemMob
                key={category.id}
                category={category}
                categoryUrlSuffix={categoryUrlSuffix}
              />
            ))}
          </ul>
        </Drawer>
      ) : (
        <List className={styles.navigationMenu}>
          {data.categoryList.map((category) => (
            <CategoryItemDesk
              key={category.id}
              category={category}
              categoryUrlSuffix={categoryUrlSuffix}
            />
          ))}
        </List>
      )}
    </>
  );
};

const CategoryItemMob = ({ category, categoryUrlSuffix }) => {
  const classes = hamburgerClasses();
  return (
    <li>
      {category.children && category.children.length > 0 ? (
        <Accordion className={classes.subMenuExpanded}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
            {category.name}
          </AccordionSummary>
          <AccordionDetails>
            <List>
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
          </AccordionDetails>
        </Accordion>
      ) : (
        <Link
          href={{
            pathname: `/${category.url_path + categoryUrlSuffix}`,
            query: { type: "CATEGORY" },
          }}
          as={`/${category.url_path + categoryUrlSuffix}`}
          className={styles.navigationLink}
        >
          {category.name}
        </Link>
      )}
    </li>
  );
};

const CategoryItemDesk = ({ category, categoryUrlSuffix }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <li
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
        <Paper>
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
        </Paper>
      )}
    </li>
  );
};
