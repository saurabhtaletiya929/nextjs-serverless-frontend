import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "./NavigationMenuGraphql.js"; // Import your query
import { List, ListItem, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";

import Link from "next/link.js";

const classes = makeStyles((theme) => ({
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
}));

export const NavigationMenu = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const store = props?.storeConfig;
  const categoryUrlSuffix = store?.category_url_suffix ?? "";

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const renderCategory = (category) => (
    <ListItem key={category.id} className={classes.listItem}>
      <Link
        href={{
          pathname: `/${category.url_path + categoryUrlSuffix}`,
          query: { type: "CATEGORY" },
        }}
        as={`/${category.url_path + categoryUrlSuffix}`}
      >
        <ListItemText primary={category.name} />
      </Link>
      {category.children && category.children.length > 0 && (
        <List>{category.children.map((child) => renderCategory(child))}</List>
      )}
    </ListItem>
  );

  return (
    <List>{data.categoryList.map((category) => renderCategory(category))}</List>
  );
};
