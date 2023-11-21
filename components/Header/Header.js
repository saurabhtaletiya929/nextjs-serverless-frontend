import * as React from "react";
import { useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { resolveImage } from "~/lib/resolve-image";
import NavigationMenu from "./NavigationMenu";
import MiniSearch from "../SearchResults/MiniSearch";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { Container, AppBar, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation";
import { useRef, useEffect } from "react";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef(null);
  const router = useRouter();

  const store = props?.storeConfig;
  const handleClick = () => {
    setSearchQuery("");
  };

  const goToSearchResults = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/catalogsearch/result?q=${debouncedSearchQuery}`);
    setSearchQuery("");
  };

  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);

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
            <Toolbar>
              <Typography
                style={{ color: "white" }}
                variant="h6"
                sx={{ flexGrow: 1 }}
              >
                Default welcome msg!
              </Typography>
              <Link
                href={{
                  pathname: "/customer/account/login",
                  query: { type: "CMS" },
                }}
                as={"/customer/account/login"}
              >
                <LockOpenIcon fontSize="medium" style={{ color: "white" }} />
              </Link>
            </Toolbar>
          </Box>
        </Container>
      </Container>

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent">
          <Container maxWidth="xl" sx={{ pt: 1 }}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link href="/">
                  <img
                    src={
                      store?.header_logo_src
                        ? resolveImage(
                            store.base_media_url +
                              "logo/" +
                              store.header_logo_src
                          )
                        : "/static/logo.png"
                    }
                    alt={store?.logo_alt ?? "Store"}
                    style={{ width: "75px", height: "75px" }}
                  />
                </Link>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <form onSubmit={(e) => goToSearchResults(e)}>
                  <Search
                    sx={{ border: 1, borderColor: "grey.500" }}
                    ref={dropdown}
                  >
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowDropdown(true);
                      }}
                      value={searchQuery}
                    />
                    <MiniSearch
                      search={debouncedSearchQuery}
                      handleClick={handleClick}
                      showDropdown={showDropdown}
                    ></MiniSearch>
                  </Search>
                </form>
                <Link href="/checkout/cart">
                  <ShoppingCartIcon color="primary" />
                </Link>
              </Box>

              {/* <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
            >
              Cart
            </Button> */}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
      <Container maxWidth="false" style={{ backgroundColor: "#f3eeeea9" }}>
        <Container maxWidth="xl">
          <NavigationMenu storeConfig={store} />
        </Container>
      </Container>
    </>
  );
};
