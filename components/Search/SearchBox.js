import { useRef, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { useDebounce } from "use-debounce";
import MiniSearch from "./MiniSearch";
import { useRouter } from "next/router";

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

export const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef(null);
  const router = useRouter();

  const clearSearch = () => {
    setSearchQuery("");
    setShowDropdown(false);
  };

  const addSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const goToSearchResults = (e) => {
    e.preventDefault();
    e.stopPropagation();
    clearSearch();
    router.push(`/catalogsearch/result?q=${debouncedSearchQuery}`);
  };

  //Close search drop down when click event occured outside
  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        clearSearch();
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);

  //Show drop down when search query is equal or greater than 3 letter
  useEffect(() => {
    if (debouncedSearchQuery.length >= 3) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [debouncedSearchQuery]);

  return (
    <form onSubmit={(e) => goToSearchResults(e)}>
      <Search
        sx={{ border: 1, borderColor: "grey.500", margin: 0 }}
        ref={dropdown}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          onChange={(e) => addSearchQuery(e)}
          value={searchQuery}
        />

        {/* MiniSearch */}
        <MiniSearch
          search={debouncedSearchQuery}
          handleClick={clearSearch}
          showDropdown={showDropdown}
          goToSearchResults={goToSearchResults}
        ></MiniSearch>
      </Search>
    </form>
  );
};
