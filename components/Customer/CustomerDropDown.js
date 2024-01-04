import * as React from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem } from "@mui/base/MenuItem";
import { styled } from "@mui/system";
import { Person3Outlined } from "@mui/icons-material";
import Link from "next/link";
import { useAuth } from "~/providers/context/AuthContext";
import { Box, IconButton, Typography } from "@mui/material";

export const CustomerDropDown = () => {
  const { logout, userData } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <Dropdown>
      <MenuButton>
        <Person3Outlined fontSize="large" color="primary"></Person3Outlined>
      </MenuButton>
      {userData ? (
        <Menu slots={{ listbox: Listbox }}>
          <MenuItem>
            <Typography>Welcome {userData?.customer.lastname}</Typography>
          </MenuItem>
          <MenuItem>
            <Typography>
              <Link
                href={{
                  pathname: "/customer/account",
                  query: { type: "CMS" },
                }}
                as={"/customer/account"}
              >
                My Account
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Typography>Logout</Typography>
          </MenuItem>
        </Menu>
      ) : (
        <Menu slots={{ listbox: Listbox }}>
          <MenuItem>
            <Typography>
              <Link
                href={{
                  pathname: "/customer/account/login",
                  query: { type: "CMS" },
                }}
                as={"/customer/account/login"}
              >
                Login
              </Link>
            </Typography>
          </MenuItem>
          <MenuItem>
            <Typography>
              <Link href="/customer/account/create">Create Account</Link>
            </Typography>
          </MenuItem>
        </Menu>
      )}
    </Dropdown>
  );
};

const Listbox = styled("ul")(
  ({ theme }) => `
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 0;
  min-width: 200px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: none;
  color: #222;
  box-shadow: 0px 4px 6px rgba(0,0,0, 0.05);
  z-index: 1;
  `
);

const MenuItem = styled(BaseMenuItem)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  user-select: none;

  &:last-of-type {
    borderBottom: none;
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  ({ theme }) => `
  padding: 0;
  border-radius: none;
  color: white;
  transition: all 150ms ease;
  cursor: pointer;
  background: transparent;
  border: none;
  color: #fff;
  box-shadow: none;

  &:hover {
    background: transparent;
    border-color: none;
  }

  &:active {
    background: transparent;
  }

  &:focus-visible {
    box-shadow: none;
    outline: none;
  }
  `
);
