// components/Registration.js

import React, { useEffect } from "react";
import {
  Typography,
  Box,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useAuth } from "~/providers/context/AuthContext";
import { Aside } from "~/components/Aside/Aside";
import { useRouter } from "next/router";
const MyAccount = () => {
  const router = useRouter();
  const { token, setToken, userData, user } = useAuth();

  useEffect(() => {
    const resultedToken = localStorage.getItem("token");
    setToken(resultedToken);
    user();
  });

  return (
    <>
      {token && (
        <Grid container spacing={4}>
          <Grid item xs={12} sm={3}>
            <Aside></Aside>
          </Grid>
          <Grid item xs={12} sm={9}>
            <Typography variant="h5" mb={2}>
              My Account
            </Typography>
            <Box sx={{ padding: "20px 0" }}>
              <Typography
                variant="h6"
                borderBottom={1}
                borderColor="#eee"
                padding="0 0 15px"
                margin="0 0 20px"
              >
                Account Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography fontWeight={700}>Contact Information</Typography>
                  <Typography>
                    {userData?.customer.firstname} {userData?.customer.lastname}
                  </Typography>
                  <Typography>{userData?.customer.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </Grid>
            </Box>
            <Box sx={{ padding: "20px 0" }}>
              <Typography
                variant="h6"
                borderBottom={1}
                borderColor="#eee"
                padding="0 0 15px"
                margin="0 0 20px"
              >
                Account Information
              </Typography>
              <Grid container spacing={2}>
                {userData?.customer.addresses.map((address, key) => {
                  return (
                    <Grid item xs={12} sm={6}>
                      <Typography fontWeight={700}>
                        Default Billing Address
                      </Typography>
                      <Typography>
                        {userData?.customer.firstname}{" "}
                        {userData?.customer.lastname}
                      </Typography>
                      <Typography>{address.street}</Typography>
                      <Typography>
                        {address.city}, {address.region.region}
                      </Typography>
                      <Typography>T: {address.telephone}</Typography>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
            <TableContainer>
              <Typography variant="h5" mb={2}>
                My Orders
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order # </TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>ship To</TableCell>
                    <TableCell>Order Total</TableCell>
                    <TableCell>Order Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userData?.customerOrders.items.map((order, key) => {
                    return (
                      <TableRow>
                        <TableCell>{order.order_number}</TableCell>
                        <TableCell>{order.created_at}</TableCell>
                        <TableCell>
                          {userData.customer.firstname}{" "}
                          {userData.customer.lastname}
                        </TableCell>
                        <TableCell>{order.grand_total}</TableCell>
                        <TableCell>{order.status}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MyAccount;
