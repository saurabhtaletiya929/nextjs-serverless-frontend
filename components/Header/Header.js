import * as React from "react";
import Link from "next/link";
import { resolveImage } from "~/lib/resolve-image";
import NavigationMenu from "./NavigationMenu";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

const classes = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  logo: {
    marginRight: theme.spacing(2),
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const Header = (props, { children }) => {
  const store = props?.storeConfig;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            <Link href="/">
              <img
                src={
                  store?.header_logo_src
                    ? resolveImage(
                        store.base_media_url + "logo/" + store.header_logo_src
                      )
                    : "/static/logo.png"
                }
                alt={store?.logo_alt ?? "Store"}
              />
            </Link>
          </Typography>
          <NavigationMenu storeConfig={store} />
          <Link
            href={{
              pathname: "/customer/account/login",
              query: { type: "CMS" },
            }}
            as={"/customer/account/login"}
          >
            <LockOpenIcon fontSize="large" />
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
