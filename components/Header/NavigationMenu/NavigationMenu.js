
import { useQuery } from '@apollo/client'
import { GET_CATEGORIES } from './NavigationMenuGraphql.js'; // Import your query
import styles from './NavigationMenu.module.css'; // Import the CSS file
import { List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

import Link from 'next/link.js';

const classes = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(2),
  },
  listItem: {
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export const NavigationMenu = (props) => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  const store = props?.storeConfig
  const categoryUrlSuffix = store?.category_url_suffix ?? ''
  
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const renderCategory = (category) => (
    <ListItem key={category.id} button component="a" href={`/${category?.url_path + categoryUrlSuffix}`} className={classes.listItem}>
      <ListItemText primary={category.name} />
      {category.children && category.children.length > 0 && (
        <List>{category.children.map((child) => renderCategory(child))}</List>
      )}
    </ListItem>
  );

  return (
    <nav >
      <List>
        {data.categoryList.map((category) => renderCategory(category))}
      </List                  >
    </nav>
  );
}
  