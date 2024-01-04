// components/Registration.js

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { GET_CUSTOMER_DATA } from "~/components/Customer/Login/CustomerDataGraphql";
import { useAuth } from "~/providers/context/AuthContext";
const MyAccount = () => {
  const { loading, error, data } = useQuery(GET_CUSTOMER_DATA);
  const { user, logout } = useAuth();
  const userData = data?.customer;
  useEffect(() => {
    user(data);
  }, [data]);

  if (!data) return null;

  return (
    <Container maxWidth="md" sx={{ padding: "30px 20px" }}>
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
              {userData.firstname} {userData.lastname}
            </Typography>
            <Typography>{userData.email}</Typography>
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
          {userData.addresses.map((address, key) => {
            return (
              <Grid item xs={12} sm={6}>
                <Typography fontWeight={700}>
                  Default Billing Address
                </Typography>
                <Typography>
                  {userData.firstname} {userData.lastname}
                </Typography>
                <Typography>{address.street}</Typography>
                <Typography>
                  {address.city}, {address.region.region}
                </Typography>
                <Typography>T: {address.telephone}</Typography>
              </Grid>
            );
          })}

          <Grid item xs={6}></Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MyAccount;
