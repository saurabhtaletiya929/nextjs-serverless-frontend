import * as React from "react";
import { useState, useCallback } from "react";
import Link from "next/link";
import { resolveImage } from "~/lib/resolve-image";
import NavigationMenu from "./NavigationMenu";

import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";

// import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";
import { CustomerDropDown } from "~/components/Customer/CustomerDropDown";
import { useAuth } from "~/providers/context/AuthContext";
import { SearchBox } from "../Search/SearchBox";

export const Header = (props, { children }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const { userData } = useAuth();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("900"));

  const store = props?.storeConfig;

  const toglleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  // const handleSearch = useCallback(
  //   (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();

  //     setSearchQuery(searchQuery);
  //   },
  //   [searchQuery]
  // );
  return (
    <>
      <Container maxWidth="false" style={{ backgroundColor: "#002A3A" }}>
        <Container maxWidth="xl">
          <Box sx={{ flexGrow: 1 }}>
            <Toolbar disableGutters>
              <Typography
                style={{ color: "white" }}
                variant="h6"
                sx={{ flexGrow: 1 }}
              >
                Welcome{" "}
                <strong>
                  {userData?.customer?.firstname} {userData?.customer?.lastname}
                </strong>
              </Typography>
            </Toolbar>
          </Box>
        </Container>
      </Container>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container maxWidth="xl" sx={{ p: 2 }}>
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1 }}>
                <Link href="/">
                  <img
                    src={
                      store?.header_logo_src
                        ? resolveImage(
                            store.base_media_url +
                              "logo/" +
                              store.header_logo_src
                          )
                        : "/static/logo.svg"
                    }
                    alt={store?.logo_alt ?? "Store"}
                  />
                </Link>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Box
                  sx={{
                    display: { xs: "none", md: "flex", marginRight: "20px" },
                  }}
                >
                  <SearchBox />
                </Box>

                <CustomerDropDown></CustomerDropDown>

                <Link href="/checkout/cart">
                  <ShoppingCartIcon
                    sx={{ fontSize: "29px" }}
                    color="primary"
                  ></ShoppingCartIcon>
                </Link>

                {isMobileView && (
                  <IconButton onClick={toglleMenu}>
                    <MenuIcon />
                  </IconButton>
                )}
              </Box>
            </Toolbar>
          </Container>

          {isMobileView && (
            <Container
              sx={{
                position: "relative",
                padding: "0 10px 15px",
              }}
            >
              <SearchBox />
            </Container>
          )}
        </AppBar>
      </Box>

      <Container maxWidth="false" style={{ backgroundColor: "#f3eeeea9" }}>
        <Container maxWidth="xl" disableGutters>
          <NavigationMenu
            storeConfig={store}
            isMobileView={isMobileView}
            isOpenMenu={isOpenMenu}
            toglleMenu={toglleMenu}
          />
        </Container>
      </Container>
    </>
  );
};
